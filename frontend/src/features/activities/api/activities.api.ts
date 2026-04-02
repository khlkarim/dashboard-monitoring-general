import api from '@/lib/api';
import {
    createActivityRequestSchema,
    activityResponseSchema,
    CreateActivityRequest,
    ActivityResponse,
    FindAllActivitiesQuery,
    ActivityListResponse,
    activityListResponseSchema,
    UpdateActivityRequest,
    updateActivityRequestSchema,
} from '../schemas/activities.schemas';

export const activitiesApi = {
    /** POST /api/v1/activities */
    create: async (data: CreateActivityRequest): Promise<ActivityResponse> => {
        createActivityRequestSchema.parse(data);
        const res = await api.post('/api/v1/activities', data);
        return activityResponseSchema.parse(res.data);
    },

    /** GET /api/v1/activities */
    findAll: async (query?: FindAllActivitiesQuery): Promise<ActivityListResponse> => {
        const res = await api.get('/api/v1/activities', { params: query });
        return activityListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/activities/risk/:riskId */
    findAllByProcessusId: async (riskId: string): Promise<ActivityListResponse> => {
        const res = await api.get(`/api/v1/activities/risk/${riskId}`);
        return activityListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/activities/:id */
    findOne: async (id: string): Promise<ActivityResponse> => {
        const res = await api.get(`/api/v1/activities/${id}`);
        return activityResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/activities/:id */
    update: async (id: string, data: UpdateActivityRequest): Promise<ActivityResponse> => {
        updateActivityRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/activities/${id}`, data);
        return activityResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/activities/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/activities/${id}`);
    },
};
