import { userResponseSchema } from '@/features/users/schemas/users.schemas';
import { z } from 'zod';

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

/** Sprint Form Schema */
export const sprintFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    goal: z.string().optional(),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    validationDate: z.date().optional(),
    status: z.enum([SprintStatus.PLANNED, SprintStatus.ACTIVE, SprintStatus.COMPLETED]),
});
export type SprintFormValues = z.infer<typeof sprintFormSchema>;

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
