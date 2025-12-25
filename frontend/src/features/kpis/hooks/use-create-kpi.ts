import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kpisApi } from '../api/kpis.api';
import { CreateKpiRequest } from '../schemas/kpis.schemas';
import { toast } from 'sonner';

export const useCreateKpi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateKpiRequest) => kpisApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpis'] });
            toast.success('KPI created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create KPI');
        },
    });
};
