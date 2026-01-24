import { toast } from 'sonner';
import { kpisApi } from '../api/kpis.api';
import { CreateKpiRequest } from '../schemas/kpis.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateKpiRequest) => kpisApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI created successfully');
        },
        onError: () => {
            toast.error('Failed to create KPI');
        },
    });
};
