import { z } from 'zod';
import { processusResponseSchema } from '@/features/processus/schemas/processus.schemas';

/** Create Activity */
export const createActivityRequestSchema = z.object({
    processus: z.object({ id: z.string() }),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
});
export type CreateActivityRequest = z.infer<typeof createActivityRequestSchema>;

/** Update Activity */
export const updateActivityRequestSchema = createActivityRequestSchema.partial();
export type UpdateActivityRequest = z.infer<typeof updateActivityRequestSchema>;

/** Activity Entity */
export const activityResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    processus: processusResponseSchema,
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type ActivityResponse = z.infer<typeof activityResponseSchema>;

/** Activity Form Schema **/
export const activityFormSchema = z.object({
    processus: z.object({
      id: z.string().min(1, "Processus is required"),
    }),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
});
export type ActivityFormValues = z.infer<typeof activityFormSchema>;

export const partialActivityFormSchema = activityFormSchema.partial();
export type PartialActivityFormValues = z.infer<typeof partialActivityFormSchema>;


/** Find All Query */
export const findAllActivitiesQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllActivitiesQuery = z.infer<typeof findAllActivitiesQuerySchema>;

export const activityListResponseSchema = z.object({
    data: z.array(activityResponseSchema),
    hasNextPage: z.boolean(),
});
export type ActivityListResponse = z.infer<typeof activityListResponseSchema>;
