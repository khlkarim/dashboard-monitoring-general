import api from '@/lib/api';
import {
    createSprintRequestSchema,
    updateSprintRequestSchema,
    sprintResponseSchema,
    CreateSprintRequest,
    UpdateSprintRequest,
    SprintResponse,
    FindAllSprintsQuery,
    sprintListResponseSchema,
    SprintListResponse,
} from '../schemas/sprints.schemas';

export const sprintsApi = {
    /** POST /api/v1/sprints */
    create: async (data: CreateSprintRequest): Promise<SprintResponse> => {
        createSprintRequestSchema.parse(data);
        const res = await api.post('/api/v1/sprints', data);
        return sprintResponseSchema.parse(res.data);
    },

    /** GET /api/v1/sprints */
    findAll: async (query?: FindAllSprintsQuery): Promise<SprintListResponse> => {
        const res = await api.get('/api/v1/sprints', { params: query });
        return sprintListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/sprints/:id */
    findOne: async (id: string): Promise<SprintResponse> => {
        const res = await api.get(`/api/v1/sprints/${id}`);
        return sprintResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/sprints/:id */
    update: async (id: string, data: UpdateSprintRequest): Promise<SprintResponse> => {
        updateSprintRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/sprints/${id}`, data);
        return sprintResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/sprints/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/sprints/${id}`);
    },
};
