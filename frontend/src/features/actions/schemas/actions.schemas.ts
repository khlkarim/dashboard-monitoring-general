import { z } from 'zod';
import { riskResponseSchema } from '@/features/risks/schemas/risks.schemas';

export enum ActionType {
    PREVENTIVE = 'PREVENTIVE',
    CORRECTIVE = 'CORRECTIVE',
}

/** Create Action */
export const createActionRequestSchema = z.object({
    risk: z.object({ id: z.string() }),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    type: z.enum([ActionType.PREVENTIVE, ActionType.CORRECTIVE]).default(ActionType.CORRECTIVE),
});
export type CreateActionRequest = z.infer<typeof createActionRequestSchema>;

/** Update Action */
export const updateActionRequestSchema = createActionRequestSchema.partial();
export type UpdateActionRequest = z.infer<typeof updateActionRequestSchema>;

/** Action Entity */
export const actionResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    risk: riskResponseSchema,
    type: z.enum([ActionType.PREVENTIVE, ActionType.CORRECTIVE]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type ActionResponse = z.infer<typeof actionResponseSchema>;

/** Action Form Schema **/
export const actionFormSchema = z.object({
    risk: z.object({ id: z.string() }),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    type: z.enum([ActionType.PREVENTIVE, ActionType.CORRECTIVE]).default(ActionType.CORRECTIVE),
});
export type ActionFormValues = z.infer<typeof actionFormSchema>;

export const partialActionFormSchema = actionFormSchema.partial();
export type PartialActionFormValues = z.infer<typeof partialActionFormSchema>;


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
