"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "./_components/users-table";
import { UsersStats } from "./_components/users-stats";
import { LoadingPage } from "@/components/common/loading-page";
import { withAuth } from "@/features/auth/components/with-auth";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetUsers } from "@/features/users/hooks/use-get-users";

function UsersPage() {
    const { 
        data: users, 
        isPending,
        isError,
        error
    } = useGetUsers();

    if(isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay 
                    title="Failed to load users data."
                    error={error}
                />
            </div>
        );
    }

    if(isPending) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header
                title="User Management"
                description="Oversee platform users, roles, and access permissions."
            />
            <Separator />
            <UsersStats users={users.data} />
            <UsersTable users={users.data} />
        </div>
    );
}

export default withAuth(UsersPage);