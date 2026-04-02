import z from "zod";

/** FileType schema */
export const fileTypeSchema = z.object({
  id: z.string(),
  path: z.string(),
});

export const fileResponseSchema = z.object({
    file: fileTypeSchema,
})
export type FileResponse = z.infer<typeof fileResponseSchema>; 