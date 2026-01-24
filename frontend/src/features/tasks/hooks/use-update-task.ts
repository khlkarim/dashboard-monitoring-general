import { toast } from 'sonner';
import { tasksApi } from '../api/tasks.api';
import { UpdateTaskRequest } from '../schemas/tasks.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateNotification } from '@/features/notifications/hooks/use-create-notification';

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const CreateNotificationMutation = useCreateNotification();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
            tasksApi.update(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated successfully');

            CreateNotificationMutation.mutate({
                title: `Task updated`,
                description: `Task with title "${data.title}" updated`,
                recipientIds: [data.assignee?.id, data.reporter?.id],
            });
        },
        onError: () => {
            toast.error('Failed to update task');
        },
    });
};
