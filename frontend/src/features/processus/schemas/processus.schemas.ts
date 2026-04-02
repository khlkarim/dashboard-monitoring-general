import { z } from 'zod';

export const createProcessusRequestSchema = z.object({
    label: z.string().min(1, "Label is required"),
    description: z.string().optional(),
});
export type CreateProcessusRequest = z.infer<typeof createProcessusRequestSchema>;

export const updateProcessusRequestSchema = createProcessusRequestSchema.partial();
export type UpdateProcessusRequest = z.infer<typeof updateProcessusRequestSchema>;

export const processusResponseSchema = z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type ProcessusResponse = z.infer<typeof processusResponseSchema>;

export const processusListResponseSchema = z.object({
    data: z.array(processusResponseSchema),
    hasNextPage: z.boolean(),
});
export type ProcessusListResponse = z.infer<typeof processusListResponseSchema>;

export const findAllProcessusQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllProcessusQuery = z.infer<typeof findAllProcessusQuerySchema>;