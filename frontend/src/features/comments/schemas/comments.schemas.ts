import { z } from 'zod';
import { userResponseSchema } from '@/features/users/schemas/users.schemas';
import { taskResponseSchema } from '@/features/tasks/schemas/tasks.schemas';

/** Create Comment */
export const createCommentRequestSchema = z.object({
    content: z.string().optional().nullable(),
    task: z.object({ id: z.string() }).optional().nullable(),
    author: z.object({ id: z.string() }).optional().nullable(),
});
export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;

/** Update Comment */
export const updateCommentRequestSchema = createCommentRequestSchema.partial();
export type UpdateCommentRequest = z.infer<typeof updateCommentRequestSchema>;

/** Comment Entity */
export const commentResponseSchema = z.object({
    id: z.string(),
    content: z.string().nullable().optional(),
    task: taskResponseSchema.optional().nullable(),
    author: userResponseSchema.optional().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type CommentResponse = z.infer<typeof commentResponseSchema>;

/** comment Form Schema **/
export const commentFormSchema = z.object({
    content: z.string().nullable().optional(),
    task: z.object({ id: z.string() }).optional().nullable(),
    author: z.object({ id: z.string() }).optional().nullable(),
});
export type CommentFormValues = z.infer<typeof commentFormSchema>;

export const partialCommentFormSchema = commentFormSchema.partial();
export type PartialCommentFormValues = z.infer<typeof partialCommentFormSchema>;


/** Find All Query */
export const findAllCommentsQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllCommentsQuery = z.infer<typeof findAllCommentsQuerySchema>;

export const commentListResponseSchema = z.object({
    data: z.array(commentResponseSchema),
    hasNextPage: z.boolean(),
});
export type CommentListResponse = z.infer<typeof commentListResponseSchema>;
