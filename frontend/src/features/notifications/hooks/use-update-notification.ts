import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notifications.api";
import { UpdateNotificationRequest } from "../schemas/notifications.schemas";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateNotificationRequest }) =>
            notificationsApi.update(id, data),
        onSuccess: () => {
            if (user?.id) {
                queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
            }
        },
    });
};
