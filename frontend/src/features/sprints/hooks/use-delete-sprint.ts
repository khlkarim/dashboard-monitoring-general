import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSprint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => sprintsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] });
            toast.success('Sprint deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete sprint');
        },
    });
};
