import { toast } from 'sonner';
import { kpisApi } from '../api/kpis.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => kpisApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete KPI');
        },
    });
};
