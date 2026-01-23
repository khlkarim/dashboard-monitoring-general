import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';
import { CreateSprintRequest } from '../schemas/sprints.schemas';
import { useCreateNotification } from '@/features/notifications/hooks/use-create-notification';
import { useGetUsers } from '@/features/users/hooks/use-get-users';

export const useCreateSprint = () => {
    const queryClient = useQueryClient();
    const CreateNotificationMutation = useCreateNotification();
    const { data: users } = useGetUsers();

    return useMutation({
        mutationFn: (data: CreateSprintRequest) => sprintsApi.create(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] });
            toast.success('Sprint created successfully');

            CreateNotificationMutation.mutate({
                title: `${data.createdBy?.firstName} created a sprint`,
                description: `Sprint ${data.name} created by ${data.createdBy?.firstName} ${data.createdBy?.lastName}`,
                recipientIds: users?.data.map((user) => user.id) || [],
            });
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create sprint');
        },
    });
};
