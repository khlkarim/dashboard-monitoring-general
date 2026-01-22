"use client";

import { UsersTable } from "./_components/users-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserCheck, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function UsersPage() {
  const { data: usersData, isLoading } = useGetUsers({ limit: 1000 });

  const stats = {
    total: usersData?.data.length || 0,
    active: usersData?.data.filter(u => u.status?.name === 'Active').length || 0,
    admins: usersData?.data.filter(u => u.role?.name === 'Administrator').length || 0,
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground text-lg">
          Oversee platform users, roles, and access permissions.
        </p>
      </div>

      <Separator />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats.total}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-500">{stats.active}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Currently active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-purple-500">{stats.admins}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              With full system access
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <UsersTable />
      </div>
    </div>
  );
}

export default withAuth(UsersPage);