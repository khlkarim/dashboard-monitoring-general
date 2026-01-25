import { toast } from 'sonner';
import { actionsApi } from '../api/actions.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => actionsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions'] });
            toast.success('Action deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete action');
        },
    });
};
