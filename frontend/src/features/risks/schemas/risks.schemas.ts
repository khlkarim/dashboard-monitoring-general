import { z } from 'zod';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

/** Create Risk */
export const createRiskRequestSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    criticity: z.number().optional().nullable(),
});
export type CreateRiskRequest = z.infer<typeof createRiskRequestSchema>;

/** Update Risk */
export const updateRiskRequestSchema = createRiskRequestSchema.partial();
export type UpdateRiskRequest = z.infer<typeof updateRiskRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** Action Entity (Circular dependency handling if needed, though here we just define it simply) */
// We might need a separate schema file for actions if this gets complex, but inline is fine for now
const actionSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

/** Risk Entity */
export const riskResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    criticity: z.number().nullable().optional(),
    actions: z.array(actionSchema).optional(),
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
