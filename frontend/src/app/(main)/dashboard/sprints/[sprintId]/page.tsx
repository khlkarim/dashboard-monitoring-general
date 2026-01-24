"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { TasksBoard } from "../_components/tasks-board";
import { SprintStats } from "../_components/sprint-stats";
import { PageHeader } from "@/components/common/page-header";
import { BaseDialog } from "@/components/common/form-dialog";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { TaskForm } from "@/features/tasks/components/task-form";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useCreateTask } from "@/features/tasks/hooks/use-create-task";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { useGetSprintById } from "@/features/sprints/hooks/use-get-sprint-by-id";

function SprintDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const sprintId = params.sprintId as string;

    const { 
        data: sprint,
        isPending: isPendingSprint,
        isError: isErrorSprint,
        error: errorSprint,
    } = useGetSprintById(sprintId);
    
    const {
        data: tasks,
        isPending: isPendingTasks,
        isError: isErrorTasks,
        error: errorTasks
    } = useGetTasks(sprintId);

    const createTaskMutation = useCreateTask();
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    function handleClose() {
        if (sprint) {
            removeSubNavItem(2, "Sprints", sprint.name || "Untitled Sprint");
        }
        router.push("/dashboard/sprints");
    };

    async function handleCreateTaskSubmit(data: any) {
        createTaskMutation.mutateAsync({
            ...data,
            sprint: { id: sprintId }
        });
        setIsCreateTaskOpen(false);
    };

    if (isErrorSprint || isErrorTasks) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay
                    title="Failed to load Sprint data."
                    error={isErrorSprint? errorSprint : errorTasks}
                />
            </div>
        );
    }

    if (isPendingSprint || isPendingTasks) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <PageHeader 
                title={sprint.name}
                description={sprint.goal}    
                breadcrumbs={[
                    { 
                        label: "Sprints",
                        onClick: () => router.push('/dashboard/sprints')
                    },
                    { 
                        label: sprint.name,
                    }
                ]} 
                actions={
                    <>
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                        <Button onClick={() => setIsCreateTaskOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add Task
                        </Button>
                    </>
                }
            />

            <Separator />

            <SprintStats
                sprint={sprint} 
                tasks={tasks.data} 
            />
            
            <TasksBoard tasks={tasks.data} />

            <BaseDialog 
                open={isCreateTaskOpen}
                onOpenChange={setIsCreateTaskOpen}
                title="Create Task"
                description="Create the mitigation Task details."
            >
                <TaskForm
                    onSubmit={handleCreateTaskSubmit}
                    isLoading={createTaskMutation.isPending}
                />
            </BaseDialog>
        </div>
    );
}

export default withAuth(SprintDetailPage);
