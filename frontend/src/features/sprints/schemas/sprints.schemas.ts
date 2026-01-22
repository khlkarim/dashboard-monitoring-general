import { z } from 'zod';
import { userResponseSchema } from '@/features/auth/schemas/auth.schemas';

export enum SprintStatus {
    PLANNED = 'PLANNED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}

/** Create Sprint */
export const createSprintRequestSchema = z.object({
    name: z.string().min(1),
    goal: z.string().optional().nullable(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    validationDate: z.string().datetime().optional().nullable(),
    status: z.enum([SprintStatus.PLANNED, SprintStatus.ACTIVE, SprintStatus.COMPLETED]).default(SprintStatus.PLANNED),
    createdBy: z.object({ id: z.string() }),
});
export type CreateSprintRequest = z.infer<typeof createSprintRequestSchema>;

/** Update Sprint */
export const updateSprintRequestSchema = createSprintRequestSchema.partial();
export type UpdateSprintRequest = z.infer<typeof updateSprintRequestSchema>;

/** Sprint Entity */
export const sprintResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    goal: z.string().nullable().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    validationDate: z.string().datetime().optional().nullable(),
    status: z.enum([SprintStatus.PLANNED, SprintStatus.ACTIVE, SprintStatus.COMPLETED]),
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

export const sprintListResponseSchema = z.object({
    data: z.array(sprintResponseSchema),
    hasNextPage: z.boolean(),
});
export type SprintListResponse = z.infer<typeof sprintListResponseSchema>;
