import z from "zod";

export const createSkillRequestSchema = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional()
});
export type CreateSkillRequest = z.infer<typeof createSkillRequestSchema>;

export const updateSkillRequestSchema = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional()
});
export type UpdateSkillRequest = z.infer<typeof updateSkillRequestSchema>;

export const skillResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
});
export type SkillResponse = z.infer<typeof skillResponseSchema>;

export const skillFormSchema = z.object({
    title: z.string().min(1, "Name is required"),
    description: z.string().optional().nullable(),
});
export type SkillFormValues = z.infer<typeof skillFormSchema>;

export const partialSkillFormSchema = skillFormSchema.partial();
export type PartialSkillFormSchema = z.infer<typeof partialSkillFormSchema>;

export const skillsListResponseSchema = z.object({
    data: z.array(skillResponseSchema),
    hasNextPage: z.boolean(),
});

export type SkillsListResponse = z.infer<typeof skillsListResponseSchema>;
