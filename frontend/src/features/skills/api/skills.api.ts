import api from '@/lib/api';
import { SkillsListResponse, skillsListResponseSchema } from '../schemas/skills.schemas';

export const skillsApi = {
    /** GET /api/v1/skills */
    findAll: async (query?: { page?: number; limit?: number }): Promise<SkillsListResponse> => {
        const res = await api.get('/api/v1/skills', { params: query });
        return skillsListResponseSchema.parse(res.data);
    },
};
