import { toast } from 'sonner';
import { kpisApi } from '../api/kpis.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateKpiRequest } from '../schemas/kpis.schemas';

export const useUpdateKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateKpiRequest }) =>
            kpisApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI updated successfully');
        },
        onError: () => {
            toast.error('Failed to update KPI');
        },
    });
};
