import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { CreateUserRequest } from '../schemas/users.schemas';
import { toast } from 'sonner';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserRequest) => usersApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create User');
        },
    });
};
