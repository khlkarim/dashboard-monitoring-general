import { toast } from 'sonner';
import { activitiesApi } from '../api/activities.api';
import { UpdateActivityRequest } from '../schemas/activities.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateActivityRequest }) =>
            activitiesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
            toast.success('Activity updated successfully');
        },
        onError: () => {
            toast.error('Failed to update activity');
        },
    });
};
