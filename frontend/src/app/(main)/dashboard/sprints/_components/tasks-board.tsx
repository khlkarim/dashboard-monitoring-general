'use client';

import {
    KanbanBoard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
    type DragEndEvent,
} from '@/components/ui/shadcn-io/kanban';
import { useMemo } from 'react';
import { TaskCard } from './task-card';
import { Task } from '@/features/tasks/types/tasks.types';
import { TaskStatus } from '@/features/tasks/schemas/tasks.schemas';
import { useUpdateTask } from '@/features/tasks/hooks/use-update-task';

const columns = [
    { id: TaskStatus.TODO.toString(), name: 'Planned', color: '#6B7280' },
    { id: TaskStatus.IN_PROGRESS.toString(), name: 'In Progress', color: '#F59E0B' },
    { id: TaskStatus.DONE.toString(), name: 'Done', color: '#10B981' },
];

interface TasksBoardProps {
    tasks: Task[];
}

export function TasksBoard({ tasks }: TasksBoardProps) {
    const updateMutation = useUpdateTask();

    const kanbanData = useMemo(() => {
        return tasks.map((task) => ({
            id: task.id,
            name: task.title,
            column: task.status,
            task: task,
        }));
    }, [tasks]);

    async function handleDragEnd(event: DragEndEvent) {
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

        const newStatus = newColumnId;
        
        // Only update if status actually changed
        if (
            (
                newStatus == TaskStatus.DONE || 
                newStatus == TaskStatus.IN_PROGRESS ||
                newStatus == TaskStatus.TODO
            ) && 
            newStatus !== draggedItem.task.status
        ) {
            await updateMutation.mutateAsync({
                id: draggedItem.task.id,
                data: { status: newStatus },
            });
        }
    };

    return (
        <>
            <KanbanProvider
                columns={columns}
                data={kanbanData}
                onDragEnd={handleDragEnd}
                onDragStart={() => console.log("lost control")}
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
                                    <TaskCard key={task.id} task={task} />
                                );
                            }}
                        </KanbanCards>
                    </KanbanBoard>
                )}
            </KanbanProvider>
        </>
    );
};

export default TasksBoard;