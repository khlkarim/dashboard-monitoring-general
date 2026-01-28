import api from '@/lib/api';
import {
    createCommentRequestSchema,
    commentResponseSchema,
    CreateCommentRequest,
    CommentResponse,
    FindAllCommentsQuery,
    CommentListResponse,
    commentListResponseSchema,
    UpdateCommentRequest,
    updateCommentRequestSchema,
} from '../schemas/comments.schemas';

export const commentsApi = {
    /** POST /api/v1/comments */
    create: async (data: CreateCommentRequest): Promise<CommentResponse> => {
        createCommentRequestSchema.parse(data);
        const res = await api.post('/api/v1/comments', data);
        return commentResponseSchema.parse(res.data);
    },

    /** GET /api/v1/comments */
    findAll: async (query?: FindAllCommentsQuery): Promise<CommentListResponse> => {
        const res = await api.get('/api/v1/comments', { params: query });
        return commentListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/comments/task/:taskId */
    findAllByTaskId: async (taskId: string): Promise<CommentListResponse> => {
        const res = await api.get(`/api/v1/comments/task/${taskId}`);
        return commentListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/comments/:id */
    findOne: async (id: string): Promise<CommentResponse> => {
        const res = await api.get(`/api/v1/comments/${id}`);
        return commentResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/comments/:id */
    update: async (id: string, data: UpdateCommentRequest): Promise<CommentResponse> => {
        updateCommentRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/comments/${id}`, data);
        return commentResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/comments/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/comments/${id}`);
    },
};
