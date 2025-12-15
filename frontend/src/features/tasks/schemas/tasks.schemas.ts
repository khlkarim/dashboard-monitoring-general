import { z } from 'zod';
import { publicUserSchema } from '@/features/auth/schemas/auth.schemas';
import { sprintResponseSchema } from '@/features/sprints/schemas/sprints.schemas';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

/** Create Task */
export const createTaskRequestSchema = z.object({
    type: z.number(),
    status: z.number(),
    reporter: publicUserSchema,
    assignee: publicUserSchema,
    sprint: sprintResponseSchema,
    dueDate: z.string().datetime(),
    description: z.string().optional().nullable(),
    title: z.string().min(1),
});
export type CreateTaskRequest = z.infer<typeof createTaskRequestSchema>;

/** Update Task */
export const updateTaskRequestSchema = createTaskRequestSchema.partial();
export type UpdateTaskRequest = z.infer<typeof updateTaskRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** Task Entity */
export const taskResponseSchema = z.object({
    id: z.string(),
    type: z.number(),
    status: z.number(),
    reporter: publicUserSchema,
    assignee: publicUserSchema,
    sprint: sprintResponseSchema,
    dueDate: z.string().datetime(),
    description: z.string().nullable().optional(),
    title: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type TaskResponse = z.infer<typeof taskResponseSchema>;

/** Find All Query */
export const findAllTasksQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllTasksQuery = z.infer<typeof findAllTasksQuerySchema>;

export const taskListResponseSchema = z.object({
    data: z.array(taskResponseSchema),
    hasNextPage: z.boolean(),
});
export type TaskListResponse = z.infer<typeof taskListResponseSchema>;