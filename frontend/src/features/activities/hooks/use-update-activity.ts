import { toast } from 'sonner';
import { activitiesApi } from '../api/activities.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateActivityRequest } from '../schemas/activities.schemas';

export const useUpdateActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateActivityRequest }) =>
            activitiesApi.update(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
            toast.success('Activity updated successfully');
        },
        onError: () => {
            toast.error('Failed to update activity');
        },
    });
};
