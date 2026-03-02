import { usersApi } from '../api/users.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMemberStatistics = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId, 'statistics'],
    queryFn: () => usersApi.getMemberStatistics(userId),
    enabled: !!userId,
  });
};
