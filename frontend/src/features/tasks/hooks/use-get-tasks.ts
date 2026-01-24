import { tasksApi } from '../api/tasks.api';
import { useQuery } from '@tanstack/react-query';

export const useGetTasks = (sprintId?: string) => {
    if(!sprintId) {
        return useQuery({
            queryKey: ['tasks'],
            queryFn: () => tasksApi.findAll(),
        });
    }

    return useQuery({
        queryKey: ['tasks', sprintId],
        queryFn: () => tasksApi.findAllBySprintId(sprintId),
    });
};