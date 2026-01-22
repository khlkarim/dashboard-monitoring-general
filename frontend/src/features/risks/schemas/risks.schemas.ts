import { z } from 'zod';

/** Create Risk */
export const createRiskRequestSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    severity: z.number().optional().nullable(),
    occurrence: z.number().optional().nullable(),
    detection: z.number().optional().nullable(),
});
export type CreateRiskRequest = z.infer<typeof createRiskRequestSchema>;

/** Update Risk */
export const updateRiskRequestSchema = createRiskRequestSchema.partial();
export type UpdateRiskRequest = z.infer<typeof updateRiskRequestSchema>;

/** Risk Entity */
export const riskResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    severity: z.number().nullable().optional(),
    occurrence: z.number().nullable().optional(),
    detection: z.number().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type RiskResponse = z.infer<typeof riskResponseSchema>;

/** Find All Query */
export const findAllRisksQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllRisksQuery = z.infer<typeof findAllRisksQuerySchema>;

export const riskListResponseSchema = z.object({
    data: z.array(riskResponseSchema),
    hasNextPage: z.boolean(),
});
export type RiskListResponse = z.infer<typeof riskListResponseSchema>;
