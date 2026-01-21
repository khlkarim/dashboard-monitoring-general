import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { actionsApi } from '../api/actions.api';
import { CreateActionRequest } from '../schemas/actions.schemas';

export const useCreateAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateActionRequest) => actionsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actions'] });
            toast.success('Action created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create action');
        },
    });
};
