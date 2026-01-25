import { toast } from 'sonner';
import { usersApi } from '../api/users.api';
import { CreateUserRequest } from '../schemas/users.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserRequest) => usersApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User created successfully');
        },
        onError: () => {
            toast.error('Failed to create User');
        },
    });
};
