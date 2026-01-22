import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';

export const useGetTasks = ({
    sprintId,
}: {
    sprintId?: string;
}) => {
    if (sprintId) {
        return useQuery({
            queryKey: ['tasks', sprintId],
            queryFn: () => tasksApi.findAllBySprintId(sprintId),
        });
    }

    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => tasksApi.findAll(),
    });
};