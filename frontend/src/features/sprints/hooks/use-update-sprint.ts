import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';
import { UpdateSprintRequest } from '../schemas/sprints.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateNotification } from '@/features/notifications/hooks/use-create-notification';
import { useGetUsers } from '@/features/users/hooks/use-get-users';

export const useUpdateSprint = () => {
    const queryClient = useQueryClient();
    const CreateNotificationMutation = useCreateNotification();
    const { data: users } = useGetUsers();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSprintRequest }) =>
            sprintsApi.update(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] });
            toast.success('Sprint updated successfully');

            CreateNotificationMutation.mutate({
                title: `${data.createdBy?.firstName} updated the sprint`,
                description: `Sprint ${data.name} updated by ${data.createdBy?.firstName} ${data.createdBy?.lastName}`,
                recipientIds: users?.data.map((user) => user.id) || [],
            });
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update sprint');
        },
    });
};
