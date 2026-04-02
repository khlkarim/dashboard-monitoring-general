import { toast } from 'sonner';
import { usersApi } from '../api/users.api';
import { UpdateUserRequest } from '../schemas/users.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => {
            return usersApi.update(id, data); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User updated successfully');
        },
        onError: () => {
            toast.error('Failed to update User');
        },
    });
};
