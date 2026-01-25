import z from "zod";

export const skillSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
})

export const skillsListResponseSchema = z.object({
    data: z.array(skillSchema),
    hasNextPage: z.boolean(),
});

export type SkillsListResponse = z.infer<typeof skillsListResponseSchema>;