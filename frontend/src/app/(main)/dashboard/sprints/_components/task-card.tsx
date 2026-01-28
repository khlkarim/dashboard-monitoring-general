import { useState } from 'react';
import { format } from "date-fns";
import { TaskDetails } from './task-details';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Protect, RoleEnum } from '@/features/auth';
import { Task } from "@/features/tasks/types/tasks.types";
import { BaseDialog } from '@/components/common/form-dialog';
import { KanbanCard } from '@/components/ui/shadcn-io/kanban';
import { TaskForm } from '@/features/tasks/components/task-form';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { useUpdateTask } from "@/features/tasks/hooks/use-update-task";
import { useDeleteTask } from "@/features/tasks/hooks/use-delete-task";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TaskCard {
    task: Task;
}

export function TaskCard({ task } : TaskCard) {
    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();

    const [isDetailsTaskOpen, setIsDetailsTaskOpen] = useState(false);
    const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);

    function handleDetails() {
        setIsDetailsTaskOpen(true);
    }

    function handleEditTask() {
        console.log("update state: ", isUpdateTaskOpen);
        setIsUpdateTaskOpen(true);
    };

    function handleDeleteTask () {
        setIsDeleteTaskOpen(true);
    };

    async function handleUpdateTaskSubmit(data: any) {
        updateTaskMutation.mutateAsync({ id: task.id, data });
        setIsUpdateTaskOpen(false);
    }

    async function handleDeleteTaskConfirm() {
        deleteTaskMutation.mutateAsync(task.id);
        setIsDeleteTaskOpen(false);
    }

    return (
        <>
            <KanbanCard
                id={task.id}
                key={task.id}
                name={task.title}
                column={task.status}
            >
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div 
                                    onClick={handleDetails}
                                    className="flex flex-col gap-1 flex-1"
                                >
                                    <p className="m-0 flex-1 font-medium text-sm">
                                        {task.title}
                                    </p>
                                    {task.description && (
                                        <p className="m-0 text-muted-foreground text-xs line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                        <div className="flex items-center gap-1 shrink-0">
                            {task.assignee && (
                                <Avatar className="h-6 w-6 shrink-0">
                                    <AvatarImage src={task.assignee?.photo?.path} />
                                    <AvatarFallback>
                                        {task.assignee.firstName?.[0]}{task.assignee.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            {/*
                                for some reason the event handlers of the buttons 
                                won't get triggerd unless we put them in drop down menus
                            */}
                            <Protect 
                                allowedRoles={[RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT]}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 text-muted-foreground hover:text-primary" 
                                            onClick={(e) => { e.stopPropagation(); handleEditTask(); }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTask(); }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </DropdownMenu>
                            </Protect>
                        </div>
                    </div>
                    <p className="m-0 text-muted-foreground text-xs">
                        Due: {format(new Date(task.dueDate), "PP")}
                    </p>
                </div>
            </KanbanCard>

            <BaseDialog
                open={isDetailsTaskOpen}
                onOpenChange={setIsDetailsTaskOpen}
                title="Task Details"
                description="Inspect the task data in detail."
                contentClassName="min-w-4xl"
            >
                <TaskDetails task={task} />
            </BaseDialog>

            <BaseDialog 
                open={isUpdateTaskOpen}
                onOpenChange={setIsUpdateTaskOpen}
                title="Edit Task"
                description="Update the task details."
            >
                <TaskForm
                    initialData={task}
                    onSubmit={handleUpdateTaskSubmit}
                    isLoading={updateTaskMutation.isPending}
                />
            </BaseDialog>

            <ConfirmDialog 
                open={isDeleteTaskOpen}
                onOpenChange={setIsDeleteTaskOpen}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the task."
                confirmLabel="Delete"
                onConfirm={handleDeleteTaskConfirm}
                isLoading={deleteTaskMutation.isPending}
                confirmVariant = "destructive"
            />
        </>
    );
}
