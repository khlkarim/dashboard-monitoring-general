import { toast } from 'sonner';
import { actionsApi } from '../api/actions.api';
import { CreateActionRequest } from '../schemas/actions.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateActionRequest) => actionsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions'] });
            toast.success('Action created successfully');
        },
        onError: () => {
            toast.error('Failed to create action');
        },
    });
};
