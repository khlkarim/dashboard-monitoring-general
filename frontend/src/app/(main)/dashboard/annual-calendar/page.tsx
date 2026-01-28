"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { GanttCalendar } from "./_components/gantt-calendar";
import { LoadingPage } from "@/components/common/loading-page";
import { withAuth } from "@/features/auth/components/with-auth";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetActivities } from "@/features/activities/hooks/use-get-activities";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

function Page() {
    const {
        data: processus,
        isPending: isPendingProcessus,
        isError: isErrorProcessus,
        error: errorProcessus
    } = useGetProcessus();

    const {
        data: activities,
        isPending: isPendingActivities,
        isError: isErrorActivities,
        error: errorActivities
    } = useGetActivities();

    if (isErrorProcessus || isErrorActivities) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <ErrorDisplay
                    title="Failed to load annual calendar."
                    error={errorProcessus || errorActivities}
                />
            </div>
        );
    }

    if (isPendingProcessus || isPendingActivities) {
        return <LoadingPage />;
    }

    return (
        <div className="grid grid-cols-1 gap-6 p-6 animate-in fade-in duration-500 max-w-[1200px] mx-auto">
            <Header
                title="Annual Calendar"
                description="Interactive scheduler visualization of project timeline and team resources."
            />

            <Separator />

            <div className="w-full overflow-x-auto">
                <GanttCalendar 
                    processus={processus.data}
                    activites={activities.data}
                />
            </div>
        </div>
    );
}

export default withAuth(Page);
