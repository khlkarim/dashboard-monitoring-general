import { z } from 'zod';
import { userResponseSchema } from '@/features/users/schemas/users.schemas';
import { sprintResponseSchema } from '@/features/sprints/schemas/sprints.schemas';
import { processusResponseSchema } from '@/features/processus/schemas/processus.schemas';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    BLOCKED = 'BLOCKED',
    DONE = 'DONE',
}

/** Create Task */
export const createTaskRequestSchema = z.object({
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.DONE]).default(TaskStatus.TODO),
    criticality: z.number().optional().nullable(),
    startDate: z.string().datetime().optional().nullable(),
    deliverable: z.string().optional().nullable(),
    reporter: z.object({ id: z.string() }).optional().nullable(),
    assignee: z.object({ id: z.string() }).optional().nullable(),
    sprint: z.object({ id: z.string() }),
    dueDate: z.string().datetime(),
    description: z.string().optional().nullable(),
    title: z.string().min(1),
    processus: z.object({ id: z.string() }).optional().nullable(),
    estimatedStartDate: z.string().datetime().optional().nullable(),
    estimatedEndDate: z.string().datetime().optional().nullable(),
    expectedDelivrable: z.string().optional().nullable(),
});
export type CreateTaskRequest = z.infer<typeof createTaskRequestSchema>;

/** Update Task */
export const updateTaskRequestSchema = createTaskRequestSchema.partial();
export type UpdateTaskRequest = z.infer<typeof updateTaskRequestSchema>;

/** Task Entity */
export const taskResponseSchema = z.object({
    id: z.string(),
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.DONE]),
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
    processus: processusResponseSchema.optional().nullable(),
    estimatedStartDate: z.string().datetime().optional().nullable(),
    estimatedEndDate: z.string().datetime().optional().nullable(),
    expectedDelivrable: z.string().optional().nullable(),
});
export type TaskResponse = z.infer<typeof taskResponseSchema>;

/** Task Form Schema */
export const taskFormSchema = z.object({
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.DONE]).default(TaskStatus.TODO),
    criticality: z.number({ message: "Criticality is required." }),
    deliverable: z.string().optional().nullable(),
    dueDate: z.string().min(1, { message: "Due date is required." }),
    description: z.string().optional().nullable(),
    title: z.string().min(1, { message: "Title is required." }),
    reporter: z.object({ id: z.string() }).optional().nullable(),
    assignee: z.object({ id: z.string() }, { message: "Assigne is required." }),
    startDate: z.string().min(1, { message: "Start date is required." }),
    processus: z.object({ id: z.string() }).optional().nullable(),
    estimatedStartDate: z.string().datetime().optional().nullable(),
    estimatedEndDate: z.string().datetime().optional().nullable(),
    expectedDelivrable: z.string().optional().nullable(),
})
    .refine((data) => data.startDate < data.dueDate, {
        message: "Start date must be before the due date.",
        path: ["startDate"],
    });
export type TaskFormValues = z.infer<typeof taskFormSchema>;

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
