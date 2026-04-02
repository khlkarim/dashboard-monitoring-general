import { tasksApi } from '../api/tasks.api';
import { useQuery } from '@tanstack/react-query';

export const useGetTasks = (sprintId?: string) => {
    if (!sprintId) {
        return useQuery({
            queryKey: ['tasks'],
            queryFn: () => { const tasks = tasksApi.findAll(); console.log(tasks); return tasks; },
        });
    }

    return useQuery({
        queryKey: ['tasks', sprintId],
        queryFn: () => tasksApi.findAllBySprintId(sprintId),
    });
};
