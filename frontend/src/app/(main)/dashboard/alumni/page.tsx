"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "../users/_components/users-table";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetAlumni } from "@/features/users/hooks/use-get-alumni";

export default function AlumniPage() {
    const { 
        data: alumni, 
        isPending,
        isError,
        error
    } = useGetAlumni();

    if(isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay 
                    title="Failed to load alumni data."
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
                title="Alumni Network"
                description="Manage former members and track their professional progress."
            />    
            <Separator />
            <UsersTable users={alumni.data} />
        </div>
    );
}