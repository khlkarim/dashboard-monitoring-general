import { useQuery } from '@tanstack/react-query';
import { kpisApi } from '../api/kpis.api';

export const useGetKpis = ({
    sprintId,
    processusId,
}: {
    sprintId?: string;
    processusId?: string;
}) => {
    if (sprintId) {
        return useQuery({
            queryKey: ['kpis', sprintId],
            queryFn: () => kpisApi.findAllBySprintId(sprintId),
        });
    }

    if (processusId) {
        return useQuery({
            queryKey: ['kpis', processusId],
            queryFn: () => kpisApi.findAllByProcessusId(processusId),
        });
    }

    return useQuery({
        queryKey: ['kpis'],
        queryFn: () => { const kpis = kpisApi.findAll(); console.log(kpis); return kpis },
    });
};
