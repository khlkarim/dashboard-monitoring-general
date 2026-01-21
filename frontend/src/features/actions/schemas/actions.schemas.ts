import { z } from 'zod';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

/** Create Action */
export const createActionRequestSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    risk: z.object({ id: z.string() }).nullable().optional(),
});
export type CreateActionRequest = z.infer<typeof createActionRequestSchema>;

/** Update Action */
export const updateActionRequestSchema = createActionRequestSchema.partial();
export type UpdateActionRequest = z.infer<typeof updateActionRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** Action Entity */
export const actionResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    risk: z.object({ id: z.string() }).nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type ActionResponse = z.infer<typeof actionResponseSchema>;

/** Find All Query */
export const findAllActionsQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllActionsQuery = z.infer<typeof findAllActionsQuerySchema>;

export const actionListResponseSchema = z.object({
    data: z.array(actionResponseSchema),
    hasNextPage: z.boolean(),
});
export type ActionListResponse = z.infer<typeof actionListResponseSchema>;
