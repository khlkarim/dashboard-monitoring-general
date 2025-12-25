import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => usersApi.findAll(),
    });
};
