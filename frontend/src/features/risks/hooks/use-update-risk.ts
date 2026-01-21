import { toast } from 'sonner';
import { risksApi } from '../api/risks.api';
import { UpdateRiskRequest } from '../schemas/risks.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateRisk = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateRiskRequest }) =>
            risksApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['risks'] });
            toast.success('Risk updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update risk');
        },
    });
};
