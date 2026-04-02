import api from '@/lib/api';
import {
    createKpiRequestSchema,
    updateKpiRequestSchema,
    kpiResponseSchema,
    CreateKpiRequest,
    UpdateKpiRequest,
    KpiResponse,
    FindAllKpisQuery,
    kpiListResponseSchema,
    KpiListResponse,
    CreateKpiResponse,
    createKpiResponseSchema
} from '../schemas/kpis.schemas';

export const kpisApi = {
    /** POST /api/v1/kpis */
    create: async (data: CreateKpiRequest): Promise<CreateKpiResponse> => {
        createKpiRequestSchema.parse(data);
        const res = await api.post('/api/v1/kpis', data);
        return createKpiResponseSchema.parse(res.data);
    },

    /** GET /api/v1/kpis */
    findAll: async (query?: FindAllKpisQuery): Promise<KpiListResponse> => {
        const res = await api.get('/api/v1/kpis', { params: query });
        console.log(res.data);
        return kpiListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/kpis/sprint/:sprintId */
    findAllBySprintId: async (sprintId: string): Promise<KpiListResponse> => {
        const res = await api.get(`/api/v1/kpis/sprint/${sprintId}`);
        return kpiListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/kpis/processus/:processusId */
    findAllByProcessusId: async (processusId: string): Promise<KpiListResponse> => {
        const res = await api.get(`/api/v1/kpis/processus/${processusId}`);
        return kpiListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/kpis/:id */
    findOne: async (id: string): Promise<KpiResponse> => {
        const res = await api.get(`/api/v1/kpis/${id}`);
        return kpiResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/kpis/:id */
    update: async (id: string, data: UpdateKpiRequest): Promise<KpiResponse> => {
        updateKpiRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/kpis/${id}`, data);
        return kpiResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/kpis/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/kpis/${id}`);
    },
};
