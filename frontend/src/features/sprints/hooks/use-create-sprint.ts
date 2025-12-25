import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';
import { CreateSprintRequest } from '../schemas/sprints.schemas';

export const useCreateSprint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSprintRequest) => sprintsApi.create(data),
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['sprints'] }), 1000);
            toast.success('Sprint created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create sprint');
        },
    });
};
