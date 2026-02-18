import api from '@/lib/api';
import {
    SkillResponse,
    UpdateSkillRequest,
    CreateSkillRequest,
    skillResponseSchema,
    createSkillRequestSchema,
    updateSkillRequestSchema,
    SkillsListResponse,
    skillsListResponseSchema
} from '../schemas/skills.schemas';

export const skillsApi = {
    create: async (data: CreateSkillRequest): Promise<SkillResponse> => {
        createSkillRequestSchema.parse(data);
        const res = await api.post('/api/v1/skills', data);
        return skillResponseSchema.parse(res.data);
    },

    /** GET /api/v1/skills */
    findAll: async (query?: { page?: number; limit?: number }): Promise<SkillsListResponse> => {
        const res = await api.get('/api/v1/skills', { params: query });
        return skillsListResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/risks/:id */
    update: async (id: string, data: UpdateSkillRequest): Promise<SkillResponse> => {
        updateSkillRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/skills/${id}`, data);
        return skillResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/risks/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/skills/${id}`);
    },
};
