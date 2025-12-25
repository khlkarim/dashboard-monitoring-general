import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kpisApi } from '../api/kpis.api';
import { toast } from 'sonner';

export const useDeleteKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => kpisApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete KPI');
        },
    });
};
