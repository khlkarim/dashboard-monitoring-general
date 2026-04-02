import api from '@/lib/api';
import {
    createRiskRequestSchema,
    updateRiskRequestSchema,
    riskResponseSchema,
    CreateRiskRequest,
    UpdateRiskRequest,
    RiskResponse,
    FindAllRisksQuery,
    riskListResponseSchema,
    RiskListResponse,
} from '../schemas/risks.schemas';

export const risksApi = {
    /** POST /api/v1/risks */
    create: async (data: CreateRiskRequest): Promise<RiskResponse> => {
        createRiskRequestSchema.parse(data);
        const res = await api.post('/api/v1/risks', data);
        return riskResponseSchema.parse(res.data);
    },

    /** GET /api/v1/risks */
    findAll: async (query?: FindAllRisksQuery): Promise<RiskListResponse> => {
        const res = await api.get('/api/v1/risks', { params: query });
        return riskListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/risks/:id */
    findOne: async (id: string): Promise<RiskResponse> => {
        const res = await api.get(`/api/v1/risks/${id}`);
        return riskResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/risks/:id */
    update: async (id: string, data: UpdateRiskRequest): Promise<RiskResponse> => {
        updateRiskRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/risks/${id}`, data);
        return riskResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/risks/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/risks/${id}`);
    },
};
