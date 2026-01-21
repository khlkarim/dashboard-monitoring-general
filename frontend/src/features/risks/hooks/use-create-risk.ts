import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { risksApi } from '../api/risks.api';
import { CreateRiskRequest } from '../schemas/risks.schemas';

export const useCreateRisk = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateRiskRequest) => risksApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['risks'] });
            toast.success('Risk created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create risk');
        },
    });
};
