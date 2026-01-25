import { usersApi } from '../api/users.api';
import { useQuery } from '@tanstack/react-query';
import { QueryUsersDto } from '../schemas/users.schemas';

export const useGetAlumni = (query?: QueryUsersDto) => {
    return useQuery({
        queryKey: ['users', 'alumni', query],
        queryFn: () => usersApi.getAlumni(query),
    });
};
