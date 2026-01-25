import { toast } from 'sonner';
import { usersApi } from '../api/users.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => usersApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete User');
        },
    });
};
