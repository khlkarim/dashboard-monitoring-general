import { z } from 'zod';
import { userResponseSchema } from '@/features/users/schemas/users.schemas';

/** Create Notification */
export const createNotificationRequestSchema = z.object({
    title: z.string().min(1).optional().nullable(),
    description: z.string().optional().nullable(),
    recipientIds: z.array(z.string().uuid()).optional().nullable(),
});
export type CreateNotificationRequest = z.infer<typeof createNotificationRequestSchema>;

/** Update Notification */
export const updateNotificationRequestSchema = createNotificationRequestSchema.partial();
export type UpdateNotificationRequest = z.infer<typeof updateNotificationRequestSchema>;

/** Notification Entity */
export const notificationResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    recipients: z.array(userResponseSchema).nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type NotificationResponse = z.infer<typeof notificationResponseSchema>;

/** Find All Query */
export const findAllNotificationsQuerySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});
export type FindAllNotificationsQuery = z.infer<typeof findAllNotificationsQuerySchema>;

export const notificationListResponseSchema = z.object({
    data: z.array(notificationResponseSchema),
    hasNextPage: z.boolean(),
});
export type NotificationListResponse = z.infer<typeof notificationListResponseSchema>;
