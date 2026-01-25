import { toast } from "sonner";
import { notificationsApi } from "../api/notifications.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNotificationRequest } from "../schemas/notifications.schemas";

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateNotificationRequest }) => notificationsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Notification created successfully');
        },
        onError: () => {
            toast.error('Failed to create notification');
        }
    });
};
