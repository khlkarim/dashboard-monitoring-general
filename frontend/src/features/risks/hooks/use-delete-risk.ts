import { toast } from 'sonner';
import { risksApi } from '../api/risks.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRisk = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => risksApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['risks'] });
            toast.success('Risk deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete risk');
        },
    });
};
