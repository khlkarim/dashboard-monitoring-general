import { toast } from 'sonner';
import { actionsApi } from '../api/actions.api';
import { UpdateActionRequest } from '../schemas/actions.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateActionRequest }) =>
            actionsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions'] });
            toast.success('Action updated successfully');
        },
        onError: () => {
            toast.error('Failed to update action');
        },
    });
};
