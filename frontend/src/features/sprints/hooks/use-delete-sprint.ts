import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';

export const useDeleteSprint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => sprintsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] });
            toast.success('Sprint deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete sprint');
        },
    });
};
