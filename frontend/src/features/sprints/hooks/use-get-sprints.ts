import { sprintsApi } from '../api/sprints.api';
import { useQuery } from '@tanstack/react-query';
import { FindAllSprintsQuery } from '../schemas/sprints.schemas';

export const useGetSprints = (query?: FindAllSprintsQuery) => {
    return useQuery({
        queryKey: ['sprints', query],
        queryFn: () => sprintsApi.findAll(query),
    });
};
