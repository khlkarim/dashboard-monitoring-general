import { toast } from 'sonner';
import { commentsApi } from '../api/comments.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => commentsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            toast.success('Comment deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete comment');
        },
    });
};
