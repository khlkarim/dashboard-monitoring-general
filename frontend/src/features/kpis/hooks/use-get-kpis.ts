import { useQuery } from '@tanstack/react-query';
import { kpisApi } from '../api/kpis.api';

export const useGetKpis = () => {
    return useQuery({
        queryKey: ['kpis'],
        queryFn: () => kpisApi.findAll(),
    });
};
