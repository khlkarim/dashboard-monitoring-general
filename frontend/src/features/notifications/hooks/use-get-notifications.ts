import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notifications.api";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const useGetNotifications = (userId: string) => {
    const queryClient = useQueryClient();
    const sseRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!userId) return;

        // Get token from auth store (it's persisted in localStorage)
        const token = useAuthStore.getState().accessToken;
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        // EventSource doesn't support custom headers, so we pass token as query param
        // Note: In production, consider using a more secure method or fetch-based SSE
        const sseUrl = `${apiUrl}api/v1/notifications/subscribe?token=${encodeURIComponent(token)}`;

        // Create SSE connection
        const sse = new EventSource(sseUrl, {
            withCredentials: true,
        });

        sseRef.current = sse;

        sse.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.event === "created" || data.event === "updated" || data.event === "deleted") {
                    queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
                }
            } catch (error) {
                console.error("Error parsing SSE event:", error);
            }
        };

        sse.onerror = (error) => {
            console.error("SSE connection error:", error);
            sse.close();
        };

        return () => {
            if (sseRef.current) {
                sseRef.current.close();
                sseRef.current = null;
            }
        };
    }, [userId, queryClient]);

    return useQuery({
        queryKey: ["notifications", userId],
        queryFn: () => notificationsApi.findAllByUserId(userId),
        enabled: !!userId,
    });
};
