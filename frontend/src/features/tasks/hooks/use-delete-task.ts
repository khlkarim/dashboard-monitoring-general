import { toast } from 'sonner';
import { tasksApi } from '../api/tasks.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => tasksApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete task');
        },
    });
};
