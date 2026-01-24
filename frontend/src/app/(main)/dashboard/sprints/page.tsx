"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { SprintsTable } from "./_components/sprints-table";
import { SprintsStats } from "./_components/sprints-stats";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";

function SprintsPage() {
    const { 
        data: sprints, 
        isPending,
        isError,
        error    
    } = useGetSprints();

    if(isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay 
                    title={"Failed to load sprints."}
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
                title="Sprint Register"
                description="Manage and track your development cycles."
            />
            <Separator />
            <SprintsStats sprints={sprints.data} />
            <SprintsTable sprints={sprints.data} />
        </div>
    );
}

export default withAuth(SprintsPage);