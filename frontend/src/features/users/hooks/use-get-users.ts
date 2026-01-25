import { usersApi } from '../api/users.api';
import { useQuery } from '@tanstack/react-query';
import { QueryUsersDto } from '../schemas/users.schemas';

export const useGetUsers = (query?: QueryUsersDto) => {
    return useQuery({
        queryKey: ['users', query],
        queryFn: () => usersApi.findAll(query),
    });
};
