import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTaskRequest } from '../schemas/tasks.schemas';
import { toast } from 'sonner';
import { tasksApi } from '../api/tasks.api';

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskRequest) => tasksApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create task');
        },
    });
};
