import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNotificationRequest } from '../schemas/notifications.schemas';
import { toast } from 'sonner';
import { notificationsApi } from '../api/notifications.api';

export const useCreateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNotificationRequest) => notificationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Notification created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create notification');
        },
    });
};
