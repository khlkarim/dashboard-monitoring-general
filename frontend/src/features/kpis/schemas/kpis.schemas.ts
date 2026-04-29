import { z } from 'zod';
import { sprintResponseSchema } from '@/features/sprints/schemas/sprints.schemas';
import { processusResponseSchema } from '@/features/processus/schemas/processus.schemas';
import { userResponseSchema } from '@/features/users/schemas/users.schemas';

/** Create KPI */
export const createKpiRequestSchema = z.object({
    sprint: z.object({ id: z.string() }).nullable().optional(),
    processus: z.object({ id: z.string() }).nullable().optional(),
    manager: z.object({ id: z.string() }),
    description: z.string().nullable().optional(),
    name: z.string().min(1),
    samples: z.array(z.string()).nullable().optional(),
    targetSamples: z.array(z.string()).nullable().optional(),
    sampleDates: z.array(z.string()).nullable().optional(),
    samplingRate: z.string().nullable().optional(),
    samplingMethod: z.string().nullable().optional(),
});
export type CreateKpiRequest = z.infer<typeof createKpiRequestSchema>;

export const createKpiResponseSchema = z.object({
    id: z.string(),
    sprint: sprintResponseSchema.nullable().optional(),
    processus: processusResponseSchema.nullable().optional(),
    manager: z.object({ id: z.string() }),
    description: z.string().nullable().optional(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    samples: z.array(z.string()).nullable().optional(),
    targetSamples: z.array(z.string()).nullable().optional(),
    sampleDates: z.array(z.string()).nullable().optional(),
    samplingRate: z.string().nullable().optional(),
    samplingMethod: z.string().nullable().optional(),
});
export type CreateKpiResponse = z.infer<typeof createKpiResponseSchema>;

/** Update KPI */
export const updateKpiRequestSchema = createKpiRequestSchema.partial();
export type UpdateKpiRequest = z.infer<typeof updateKpiRequestSchema>;

/** KPI Entity */
export const kpiResponseSchema = z.object({
    id: z.string(),
    sprint: sprintResponseSchema.nullable().optional(),
    processus: processusResponseSchema.nullable().optional(),
    manager: userResponseSchema,
    description: z.string().nullable().optional(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    samples: z.array(z.string()).nullable().optional(),
    targetSamples: z.array(z.string()).nullable().optional(),
    sampleDates: z.array(z.string()).nullable().optional(),
    samplingRate: z.string().nullable().optional(),
    samplingMethod: z.string().nullable().optional(),
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
