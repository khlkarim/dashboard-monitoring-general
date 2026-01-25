import { notificationsApi } from "../api/notifications.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteNotification = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => notificationsApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Notification created successfully');
        },
        onError: () => {
            toast.error('Failed to create notification');
        }
    });
};
