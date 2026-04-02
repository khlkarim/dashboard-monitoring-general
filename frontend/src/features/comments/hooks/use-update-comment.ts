import { toast } from 'sonner';
import { commentsApi } from '../api/comments.api';
import { UpdateCommentRequest } from '../schemas/comments.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCommentRequest }) =>
            commentsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            toast.success('Comment updated successfully');
        },
        onError: () => {
            toast.error('Failed to update comment');
        },
    });
};
