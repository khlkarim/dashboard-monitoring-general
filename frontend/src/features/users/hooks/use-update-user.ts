import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { UpdateUserRequest } from '../schemas/users.schemas';
import { toast } from 'sonner';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => { console.log("Update user request: ", id, data); return usersApi.update(id, data); },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update User');
        },
    });
};
