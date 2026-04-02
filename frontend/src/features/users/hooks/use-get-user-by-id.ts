import { usersApi } from '../api/users.api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserById = ({
    id
}: {
    id: string
}) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => usersApi.findOne(id),
    });
};
