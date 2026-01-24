import { sprintsApi } from '../api/sprints.api';
import { useQuery } from '@tanstack/react-query';

export const useGetSprintById = (sprintId: string) => {
    return useQuery({
        queryKey: ['sprints'],
        queryFn: () => sprintsApi.findOne(sprintId),
    });
};
