import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { actionsApi } from '../api/actions.api';

export const useDeleteAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => actionsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions'] });
            toast.success('Action deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete action');
        },
    });
};
