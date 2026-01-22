import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { UpdateUserRequest } from '../schemas/auth.schemas';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const authStore = useAuthStore();

    return useMutation({
        mutationFn: async ({ data }: { data: UpdateUserRequest }) => { const result = await authApi.update(data); authStore.updateUser(result); return result; },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            toast.success('User updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update user');
        },
    });
};
