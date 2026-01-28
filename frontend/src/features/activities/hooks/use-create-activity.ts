import { toast } from 'sonner';
import { activitiesApi } from '../api/activities.api';
import { CreateActivityRequest } from '../schemas/activities.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateActivityRequest) => activitiesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
            toast.success('Activity created successfully');
        },
        onError: () => {
            toast.error('Failed to create activity');
        },
    });
};
