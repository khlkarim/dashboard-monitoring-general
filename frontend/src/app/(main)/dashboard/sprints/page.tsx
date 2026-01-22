"use client";

import { SprintsTable } from "./_components/sprints-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SprintStatus } from "@/features/sprints/schemas/sprints.schemas";
import { Activity, CheckCircle2, Clock, ListChecks } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function SprintsPage() {
  const { data: sprintsData, isLoading } = useGetSprints({ limit: 1000 });

  const stats = {
    total: sprintsData?.data.length || 0,
    active: sprintsData?.data.filter((s) => s.status === SprintStatus.ACTIVE).length || 0,
    planned: sprintsData?.data.filter((s) => s.status === SprintStatus.PLANNED).length || 0,
    completed: sprintsData?.data.filter((s) => s.status === SprintStatus.COMPLETED).length || 0,
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sprints</h1>
        <p className="text-muted-foreground text-lg">
          Manage and track your development cycles.
        </p>
      </div>

      <Separator />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sprints</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats.total}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              All time sprints
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-blue-500">{stats.active}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-orange-500">{stats.planned}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Upcoming sprints
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Successfully finished
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <SprintsTable />
      </div>
    </div>
  );
}

export default withAuth(SprintsPage);