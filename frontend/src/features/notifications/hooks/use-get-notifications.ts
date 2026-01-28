import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notifications.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useGetNotifications = (userId: string) => {
    const queryClient = useQueryClient();
    const token = useAuthStore(state => state.accessToken);

    useEffect(() => {
        if (!token) return;
        if (!userId) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const sseUrl = `${apiUrl}api/v1/notifications/subscribe`;

        fetchEventSource(sseUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token, 
            },
            onmessage(ev) { 
                try {
                    const data = JSON.parse(ev.data);
                    console.log("data: ", data);
                    if (data.event === "created" || data.event === "updated" || data.event === "deleted") {
                        queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
                    }
                } catch (error) {
                    console.log("Error parsing SSE event:", ev);
                }
            } 
        });
    }, [userId, queryClient]);

    return useQuery({
        queryKey: ["notifications", userId],
        queryFn: () => notificationsApi.findAllByUserId(userId),
        enabled: !!userId,
    });
};
