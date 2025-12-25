import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kpisApi } from '../api/kpis.api';
import { UpdateKpiRequest } from '../schemas/kpis.schemas';
import { toast } from 'sonner';

export const useUpdateKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateKpiRequest }) =>
            kpisApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update KPI');
        },
    });
};
