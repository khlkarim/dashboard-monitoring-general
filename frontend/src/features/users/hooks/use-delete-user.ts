import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { toast } from 'sonner';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => usersApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete User');
        },
    });
};
