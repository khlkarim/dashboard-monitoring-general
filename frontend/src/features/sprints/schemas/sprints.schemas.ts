import { z } from 'zod';
import { userResponseSchema } from '@/features/auth/schemas/auth.schemas';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

/** Create Sprint */
export const createSprintRequestSchema = z.object({
    name: z.string().min(1),
    goal: z.string().optional().nullable(),
    startDate: z.string().datetime(), // Expecting ISO string
    endDate: z.string().datetime(),   // Expecting ISO string
    status: z.number(),
    createdBy: z.object({ id: z.union([z.string(), z.number()]) }),
});
export type CreateSprintRequest = z.infer<typeof createSprintRequestSchema>;

/** Update Sprint */
// Based on PartialType(CreateSprintDto)
export const updateSprintRequestSchema = createSprintRequestSchema.partial();
export type UpdateSprintRequest = z.infer<typeof updateSprintRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** Sprint Entity */
export const sprintResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    goal: z.string().nullable().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    status: z.number(),
    createdBy: userResponseSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type SprintResponse = z.infer<typeof sprintResponseSchema>;

/** Find All Query */
export const findAllSprintsQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllSprintsQuery = z.infer<typeof findAllSprintsQuerySchema>;

/** Cancel/Delete is generic, usually just ID needs validation which is done in path param */

export const sprintListResponseSchema = z.object({
    data: z.array(sprintResponseSchema),
    hasNextPage: z.boolean(),
});
export type SprintListResponse = z.infer<typeof sprintListResponseSchema>;
