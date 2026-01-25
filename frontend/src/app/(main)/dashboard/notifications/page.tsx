"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { LoadingPage } from "@/components/common/loading-page";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ErrorDisplay } from "@/components/common/error-display";
import { NotificationsList } from "./_components/notifications-list";
import { withAuth } from "@/features/auth/components/with-auth";
import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import { NotificationStats } from "./_components/notifications-stats";

function NotificationsPage() {
    const { user } = useAuthStore();
    const {
        data: notifications,
        isPending,
        isError,
        error
    } = useGetNotifications(user?.id || "");

    if(isError) {
        return (
            <ErrorDisplay 
                title="Failed to load user notifications."
                error={error}
            />
        );
    }

    if(isPending) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header
                title="Notification Center"
                description="Stay up to date and get notified on the latest changes."
            />
            <Separator />
            <NotificationStats notifications={notifications.data} />
            <NotificationsList notifications={notifications.data} />
        </div>
    );
}

export default withAuth(NotificationsPage); 