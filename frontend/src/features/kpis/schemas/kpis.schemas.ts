import { z } from 'zod';
import { publicUserSchema } from '@/features/auth/schemas/auth.schemas';
import { sprintResponseSchema } from '@/features/sprints/schemas/sprints.schemas';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

/** Create KPI */
export const createKpiRequestSchema = z.object({
    sprint: sprintResponseSchema.nullable().optional(),
    createdBy: publicUserSchema,
    targetValue: z.number().nullable().optional(),
    actualValue: z.number().nullable().optional(),
    description: z.string().nullable().optional(),
    name: z.string().min(1),
});
export type CreateKpiRequest = z.infer<typeof createKpiRequestSchema>;

/** Update KPI */
export const updateKpiRequestSchema = createKpiRequestSchema.partial();
export type UpdateKpiRequest = z.infer<typeof updateKpiRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** KPI Entity */
export const kpiResponseSchema = z.object({
    id: z.string(),
    sprint: sprintResponseSchema.nullable().optional(),
    createdBy: publicUserSchema,
    targetValue: z.coerce.number().nullable().optional(),
    actualValue: z.coerce.number().nullable().optional(),
    description: z.string().nullable().optional(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type KpiResponse = z.infer<typeof kpiResponseSchema>;

/** Find All Query */
export const findAllKpisQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllKpisQuery = z.infer<typeof findAllKpisQuerySchema>;

export const kpiListResponseSchema = z.object({
    data: z.array(kpiResponseSchema),
    hasNextPage: z.boolean(),
});
export type KpiListResponse = z.infer<typeof kpiListResponseSchema>;
