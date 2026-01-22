import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notifications.api";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    return useMutation({
        mutationFn: (id: string) => notificationsApi.remove(id),
        onSuccess: () => {
            if (user?.id) {
                queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
            }
        },
    });
};
