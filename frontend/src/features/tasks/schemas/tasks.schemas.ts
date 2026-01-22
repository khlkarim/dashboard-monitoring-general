import { z } from 'zod';
import { userResponseSchema } from '@/features/auth/schemas/auth.schemas';
import { sprintResponseSchema } from '@/features/sprints/schemas/sprints.schemas';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

/** Create Task */
export const createTaskRequestSchema = z.object({
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]).default(TaskStatus.TODO),
    criticality: z.number().optional().nullable(),
    startDate: z.string().datetime().optional().nullable(),
    deliverable: z.string().optional().nullable(),
    reporter: z.object({ id: z.string() }).optional().nullable(),
    assignee: z.object({ id: z.string() }).optional().nullable(),
    sprint: z.object({ id: z.string() }),
    dueDate: z.string().datetime(),
    description: z.string().optional().nullable(),
    title: z.string().min(1),
});
export type CreateTaskRequest = z.infer<typeof createTaskRequestSchema>;

/** Update Task */
export const updateTaskRequestSchema = createTaskRequestSchema.partial();
export type UpdateTaskRequest = z.infer<typeof updateTaskRequestSchema>;

/** Task Entity */
export const taskResponseSchema = z.object({
    id: z.string(),
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]),
    criticality: z.number().optional().nullable(),
    startDate: z.string().datetime().optional().nullable(),
    deliverable: z.string().optional().nullable(),
    reporter: userResponseSchema,
    assignee: userResponseSchema,
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