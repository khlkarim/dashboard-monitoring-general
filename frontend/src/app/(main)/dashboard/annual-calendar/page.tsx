"use client";

import { Separator } from "@/components/ui/separator";
import { GanttCalendar } from "./_components/gantt-calendar";
import { LoadingPage } from "@/components/common/loading-page";
import { withAuth } from "@/features/auth/components/with-auth";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetActivities } from "@/features/activities/hooks/use-get-activities";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BaseDialog } from "@/components/common/form-dialog";
import { ActivityForm } from "@/features/activities/components/activity-form";
import { useCreateActivity } from "@/features/activities/hooks/use-create-activity";

function Page() {
    const createActivityMutation = useCreateActivity();

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

    const [isCreateActivityOpen, setIsCreateActivityOpen] = useState<boolean>(false);

    function handleAddActivity() {
        setIsCreateActivityOpen(true);
    }

    async function handleAddActivitySubmit(data: any) {
        await createActivityMutation.mutateAsync({ ...data });
        setIsCreateActivityOpen(false);
    }

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
            <PageHeader 
                title="Annual Calendar"
                description="Interactive scheduler visualization of project timeline and team resources."  
                breadcrumbs={[]} 
                actions={
                    <>
                        <Button onClick={handleAddActivity}>
                            <Plus />
                            Add Activity
                        </Button>
                    </>
                }
            />

            <Separator />

            <div className="w-full overflow-x-auto">
                <GanttCalendar 
                    processus={processus.data}
                    activities={activities.data}
                />
            </div>

            <BaseDialog
                open={isCreateActivityOpen}
                onOpenChange={setIsCreateActivityOpen}
                title="Add Activity"
                description="Define a new activity for a processus."
            >
                <ActivityForm 
                    onSubmit={handleAddActivitySubmit}
                    isLoading={createActivityMutation.isPending}
                />
            </BaseDialog>
        </div>
    );
}

export default withAuth(Page);
