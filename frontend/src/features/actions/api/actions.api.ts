import api from '@/lib/api';
import {
    createActionRequestSchema,
    actionResponseSchema,
    CreateActionRequest,
    ActionResponse,
    FindAllActionsQuery,
    ActionListResponse,
    actionListResponseSchema,
    UpdateActionRequest,
    updateActionRequestSchema,
} from '../schemas/actions.schemas';

export const actionsApi = {
    /** POST /api/v1/actions */
    create: async (data: CreateActionRequest): Promise<ActionResponse> => {
        createActionRequestSchema.parse(data);
        const res = await api.post('/api/v1/actions', data);
        return actionResponseSchema.parse(res.data);
    },

    /** GET /api/v1/actions */
    findAll: async (query?: FindAllActionsQuery): Promise<ActionListResponse> => {
        const res = await api.get('/api/v1/actions', { params: query });
        return actionListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/actions/:id */
    findOne: async (id: string): Promise<ActionResponse> => {
        const res = await api.get(`/api/v1/actions/${id}`);
        return actionResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/actions/:id */
    update: async (id: string, data: UpdateActionRequest): Promise<ActionResponse> => {
        updateActionRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/actions/${id}`, data);
        return actionResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/actions/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/actions/${id}`);
    },
};
