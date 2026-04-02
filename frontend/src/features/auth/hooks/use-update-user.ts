import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserRequest } from '@/features/users/schemas/users.schemas';

export const useUpdateUser = () => {
    const authStore = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data }: { data: UpdateUserRequest }) => { 
            const result = await authApi.update(data); 
            authStore.updateUser(result); 
            return result; 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            toast.success('User updated successfully');
        },
        onError: () => {
            toast.error('Failed to update user');
        },
    });
};
