import { toast } from 'sonner';
import { activitiesApi } from '../api/activities.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => activitiesApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
            toast.success('Activity deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete activity');
        },
    });
};
