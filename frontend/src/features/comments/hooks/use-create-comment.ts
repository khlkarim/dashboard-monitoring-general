import { toast } from 'sonner';
import { commentsApi } from '../api/comments.api';
import { CreateCommentRequest } from '../schemas/comments.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCommentRequest) => commentsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            toast.success('Comment created successfully');
        },
        onError: () => {
            toast.error('Failed to create comment');
        },
    });
};
