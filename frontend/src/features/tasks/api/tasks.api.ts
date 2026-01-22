import api from '@/lib/api';
import {
    createTaskRequestSchema,
    updateTaskRequestSchema,
    taskResponseSchema,
    taskListResponseSchema,
    CreateTaskRequest,
    UpdateTaskRequest,
    TaskResponse,
    FindAllTasksQuery,
    TaskListResponse,
} from '../schemas/tasks.schemas';

export const tasksApi = {
    /** POST /api/v1/tasks */
    create: async (data: CreateTaskRequest): Promise<TaskResponse> => {
        createTaskRequestSchema.parse(data);
        const res = await api.post('/api/v1/tasks', data);
        return taskResponseSchema.parse(res.data);
    },

    /** GET /api/v1/tasks */
    findAll: async (query?: FindAllTasksQuery): Promise<TaskListResponse> => {
        const res = await api.get('/api/v1/tasks', { params: query });
        return taskListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/tasks/sprint/:sprintId */
    findAllBySprintId: async (sprintId: string): Promise<TaskListResponse> => {
        const res = await api.get(`/api/v1/tasks/sprint/${sprintId}`);
        return taskListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/tasks/:id */
    findOne: async (id: string): Promise<TaskResponse> => {
        const res = await api.get(`/api/v1/tasks/${id}`);
        return taskResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/tasks/:id */
    update: async (id: string, data: UpdateTaskRequest): Promise<TaskResponse> => {
        updateTaskRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/tasks/${id}`, data);
        return taskResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/tasks/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/tasks/${id}`);
    },
};
