import { toast } from 'sonner';
import { sprintsApi } from '../api/sprints.api';
import { UpdateSprintRequest } from '../schemas/sprints.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSprint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSprintRequest }) =>
            sprintsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] });
            toast.success('Sprint updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update sprint');
        },
    });
};
