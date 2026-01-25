import { toast } from 'sonner';
import { notificationsApi } from '../api/notifications.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNotificationRequest } from '../schemas/notifications.schemas';

export const useCreateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNotificationRequest) => notificationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Notification created successfully');
        },
        onError: () => {
            toast.error('Failed to create notification');
        },
    });
};
