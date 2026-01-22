import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';

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
