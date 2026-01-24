"use client";

import { Bell } from "lucide-react";
import { NotificationCard } from "./notification-card";
import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "@/features/notifications/types/notifications.types";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

interface NotificationsListProps {
    notifications: Notification[];
}

export function NotificationsList({ notifications } : NotificationsListProps) {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
                {!(notifications.length > 0) ? (
                    <Card>
                        <CardContent className="pt-6">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Bell className="h-6 w-6" />
                                    </EmptyMedia>
                                    <EmptyTitle>No notifications</EmptyTitle>
                                    <EmptyDescription>
                                        You don't have any notifications yet. Check back later for updates.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {notifications.toReversed().map((notification) => (
                            <NotificationCard 
                                key={notification.id}
                                notification={notification} 
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}
