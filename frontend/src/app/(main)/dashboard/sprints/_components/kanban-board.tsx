'use client';

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
    type DragEndEvent,
} from '@/components/ui/shadcn-io/kanban';
import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, MoreVertical, Pencil } from 'lucide-react';
import { TaskStatus } from '@/features/tasks/schemas/tasks.schemas';
import { Task } from '@/features/tasks/types/tasks.types';
import { useUpdateTask } from '@/features/tasks/hooks/use-update-task';
import { useDeleteTask } from '@/features/tasks/hooks/use-delete-task';
import { CreateEntityDialog } from '@/components/common/create-entity-dialog';
import { EditEntityDialog } from '@/components/common/edit-entity-dialog';
import { DeleteEntityDialog } from '@/components/common/delete-entity-dialog';
import { TaskForm } from '@/features/tasks/components/task-form';
import { useCreateTask } from '@/features/tasks/hooks/use-create-task';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Map task status to kanban columns
const STATUS_TO_COLUMN: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'TODO',
    [TaskStatus.IN_PROGRESS]: 'IN_PROGRESS',
    [TaskStatus.DONE]: 'DONE',
};

const COLUMN_TO_STATUS: Record<string, TaskStatus> = {
    'TODO': TaskStatus.TODO,
    'IN_PROGRESS': TaskStatus.IN_PROGRESS,
    'DONE': TaskStatus.DONE,
};

const columns = [
    { id: 'TODO', name: 'Planned', color: '#6B7280' },
    { id: 'IN_PROGRESS', name: 'In Progress', color: '#F59E0B' },
    { id: 'DONE', name: 'Done', color: '#10B981' },
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
});

interface KanbanBoardComponentProps {
    tasks: Task[];
    sprintId: string;
}

const KanbanBoardComponent = ({ tasks, sprintId }: KanbanBoardComponentProps) => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const updateTask = useUpdateTask();
    const createTask = useCreateTask();
    const deleteTask = useDeleteTask();

    // Transform tasks to kanban format
    const kanbanData = useMemo(() => {
        return tasks.map((task) => ({
            id: task.id,
            name: task.title,
            column: STATUS_TO_COLUMN[task.status],
            task: task, // Store full task object for editing
        }));
    }, [tasks]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        // Find the task being dragged
        const draggedItem = kanbanData.find((item) => item.id === active.id);
        if (!draggedItem) {
            return;
        }

        // Determine the new column (status)
        // First check if dropped directly on a column
        const droppedColumn = columns.find((col) => col.id === over.id);
        let newColumnId: string;
        
        if (droppedColumn) {
            // Dropped directly on a column
            newColumnId = droppedColumn.id;
        } else {
            // Dropped on another card - find that card's column
            const droppedItem = kanbanData.find((item) => item.id === over.id);
            newColumnId = droppedItem?.column || draggedItem.column;
        }

        const newStatus = COLUMN_TO_STATUS[newColumnId];
        
        // Only update if status actually changed
        if (newStatus && newStatus !== draggedItem.task.status) {
            try {
                await updateTask.mutateAsync({
                    id: draggedItem.task.id,
                    data: { status: newStatus },
                });
            } catch (error: any) {
                // Error handling is done in the hook, but we can add additional handling here
                const errorMessage = error?.response?.data?.message || 'Failed to update task status';
                toast.error(errorMessage);
            }
        }
    };

    const handleCreateTask = async (data: any) => {
        try {
            await createTask.mutateAsync({
                ...data,
                sprint: { id: sprintId },
            });
            setCreateDialogOpen(false);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to create task';
            toast.error(errorMessage);
        }
    };

    const handleEditTask = async (data: any) => {
        if (!selectedTask) return;
        
        try {
            await updateTask.mutateAsync({
                id: selectedTask.id,
                data,
            });
            setEditDialogOpen(false);
            setSelectedTask(null);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to update task';
            toast.error(errorMessage);
        }
    };

    const handleCardClick = (task: Task) => {
        setSelectedTask(task);
        setEditDialogOpen(true);
    };

    const handleEditClick = (e: React.MouseEvent, task: Task) => {
        e.stopPropagation(); // Prevent triggering card click
        setSelectedTask(task);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (e: React.MouseEvent, task: Task) => {
        e.stopPropagation(); // Prevent triggering card click
        setSelectedTask(task);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async (task: Task) => {
        try {
            await deleteTask.mutateAsync(task.id);
            setDeleteDialogOpen(false);
            setSelectedTask(null);
        } catch (error: any) {
            // Error handling is done in the hook
            const errorMessage = error?.response?.data?.message || 'Failed to delete task';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                </Button>
            </div>

            <KanbanProvider
                columns={columns}
                data={kanbanData}
                onDragEnd={handleDragEnd}
            >
                {(column) => (
                    <KanbanBoard id={column.id} key={column.id}>
                        <KanbanHeader>
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: column.color }}
                                />
                                <span>{column.name}</span>
                                <span className="text-xs text-muted-foreground ml-1">
                                    ({kanbanData.filter((item) => item.column === column.id).length})
                                </span>
                            </div>
                        </KanbanHeader>
                        <KanbanCards id={column.id}>
                            {(item: (typeof kanbanData)[number]) => {
                                const task = item.task;
                                return (
                                    <KanbanCard
                                        column={column.id}
                                        id={item.id}
                                        key={item.id}
                                        name={item.name}
                                    >
                                        <div className="space-y-2">
                                            <div 
                                                className="flex items-start justify-between gap-2 cursor-pointer"
                                                onClick={() => handleCardClick(task)}
                                            >
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <p className="m-0 flex-1 font-medium text-sm">
                                                        {task.title}
                                                    </p>
                                                    {task.description && (
                                                        <p className="m-0 text-muted-foreground text-xs line-clamp-2">
                                                            {task.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {task.assignee && (
                                                        <Avatar className="h-6 w-6 shrink-0">
                                                            <AvatarImage src={task.assignee?.photo?.path} />
                                                            <AvatarFallback>
                                                                {task.assignee.firstName?.[0]}{task.assignee.lastName?.[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6 shrink-0"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <MoreVertical className="h-3 w-3" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                                            <DropdownMenuItem
                                                                onClick={(e) => handleEditClick(e, task)}
                                                                className="text-primary focus:text-primary"
                                                            >
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={(e) => handleDeleteClick(e, task)}
                                                                className="text-destructive focus:text-destructive"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                            <p className="m-0 text-muted-foreground text-xs">
                                                Due: {shortDateFormatter.format(new Date(task.dueDate))}
                                            </p>
                                        </div>
                                    </KanbanCard>
                                );
                            }}
                        </KanbanCards>
                    </KanbanBoard>
                )}
            </KanbanProvider>

            {/* Create Task Dialog */}
            <CreateEntityDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                title="Create Task"
                description="Add a new task to this sprint"
            >
                {({ setOpen }) => (
                    <TaskForm
                        sprintId={sprintId}
                        onSubmit={handleCreateTask}
                        isLoading={createTask.isPending}
                    />
                )}
            </CreateEntityDialog>

            {/* Edit Task Dialog */}
            <EditEntityDialog
                open={editDialogOpen}
                onOpenChange={(open) => {
                    setEditDialogOpen(open);
                    if (!open) setSelectedTask(null);
                }}
                entity={selectedTask}
                title="Edit Task"
                description="Update task details"
            >
                {({ entity, setOpen }) => (
                    <TaskForm
                        initialData={{
                            title: entity.title,
                            description: entity.description || '',
                            status: entity.status,
                            criticality: entity.criticality,
                            deliverable: entity.deliverable,
                            dueDate: entity.dueDate,
                            assignee: entity.assignee,
                            reporter: entity.reporter,
                        }}
                        sprintId={sprintId}
                        onSubmit={handleEditTask}
                        isLoading={updateTask.isPending}
                    />
                )}
            </EditEntityDialog>

            {/* Delete Task Dialog */}
            <DeleteEntityDialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    setDeleteDialogOpen(open);
                    if (!open) setSelectedTask(null);
                }}
                entity={selectedTask}
                entityName="task"
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteTask.isPending}
            />
        </>
    );
};

export default KanbanBoardComponent;