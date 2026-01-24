import { toast } from 'sonner';
import { tasksApi } from '../api/tasks.api';
import { CreateTaskRequest } from '../schemas/tasks.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateNotification } from '@/features/notifications/hooks/use-create-notification';

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const CreateNotificationMutation = useCreateNotification();

    return useMutation({
        mutationFn: (data: CreateTaskRequest) => tasksApi.create(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');

            CreateNotificationMutation.mutate({
                title: `${data.reporter?.firstName} assigned you a task`,
                description: `Task ${data.title} created by ${data.reporter?.firstName} ${data.reporter?.lastName}`,
                recipientIds: [data.assignee?.id],
            });
        },
        onError: () => {
            toast.error('Failed to create task');
        },
    });
};
