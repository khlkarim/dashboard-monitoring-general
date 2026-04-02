import api from '@/lib/api';
import {
    createNotificationRequestSchema,
    updateNotificationRequestSchema,
    notificationResponseSchema,
    CreateNotificationRequest,
    UpdateNotificationRequest,
    NotificationResponse,
    FindAllNotificationsQuery,
    notificationListResponseSchema,
    NotificationListResponse,
} from '../schemas/notifications.schemas';

export const notificationsApi = {
    /** POST /api/v1/notifications */
    create: async (data: CreateNotificationRequest): Promise<NotificationResponse> => {
        createNotificationRequestSchema.parse(data);
        const res = await api.post('/api/v1/notifications', data);
        return notificationResponseSchema.parse(res.data);
    },

    /** GET /api/v1/notifications */
    findAll: async (query?: FindAllNotificationsQuery): Promise<NotificationListResponse> => {
        const res = await api.get('/api/v1/notifications', { params: query });
        return notificationListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/notifications/user/:userId */
    findAllByUserId: async (userId: string, query?: FindAllNotificationsQuery): Promise<NotificationListResponse> => {
        const res = await api.get(`/api/v1/notifications/user/${userId}`, { params: query });
        return notificationListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/notifications/:id */
    findOne: async (id: string): Promise<NotificationResponse> => {
        const res = await api.get(`/api/v1/notifications/${id}`);
        return notificationResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/notifications/:id */
    update: async (id: string, data: UpdateNotificationRequest): Promise<NotificationResponse> => {
        updateNotificationRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/notifications/${id}`, data);
        return notificationResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/notifications/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/notifications/${id}`);
    },
};
