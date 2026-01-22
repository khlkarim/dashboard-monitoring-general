"use client";

import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteNotification } from "@/features/notifications/hooks/use-delete-notification";
import { format, formatDistanceToNow } from "date-fns";
import { Bell, Trash2, Users, AlertCircle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

export function NotificationsList() {
    const { user } = useAuthStore();
    const { data: notificationsData, isLoading, error } = useGetNotifications(user?.id || "");
    const deleteNotification = useDeleteNotification();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const notifications = notificationsData?.data || [];
    const hasNotifications = notifications.length > 0;

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteNotification.mutateAsync(id);
        } finally {
            setDeletingId(null);
        }
    };

    const stats = {
        total: notifications.length,
        withRecipients: notifications.filter((n) => n.recipients && n.recipients.length > 0).length,
    };

    if (error) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Failed to load notifications</h3>
                            <p className="text-sm text-muted-foreground">
                                {error instanceof Error ? error.message : "An unexpected error occurred"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground text-lg">
                    Stay updated with important messages and updates.
                </p>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">{stats.total}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            All notifications
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">With Recipients</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-blue-500">{stats.withRecipients}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            Targeted notifications
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Notifications List */}
            <div className="grid gap-6">
                {isLoading ? (
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ) : !hasNotifications ? (
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
                        {notifications.map((notification) => (
                            <Card
                                key={notification.id}
                                className="transition-all hover:shadow-md"
                            >
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg">
                                                {notification.title || "Untitled Notification"}
                                            </CardTitle>
                                            {notification.recipients && notification.recipients.length > 0 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {notification.recipients.length}{" "}
                                                    {notification.recipients.length === 1 ? "recipient" : "recipients"}
                                                </Badge>
                                            )}
                                        </div>
                                        {notification.description && (
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {notification.description}
                                            </p>
                                        )}
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                disabled={deletingId === notification.id}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this notification? This action
                                                    cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-4">
                                            <span>
                                                Created {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {format(new Date(notification.createdAt), "PPp")}
                                            </span>
                                        </div>
                                        {notification.updatedAt !== notification.createdAt && (
                                            <span>
                                                Updated {formatDistanceToNow(new Date(notification.updatedAt), { addSuffix: true })}
                                            </span>
                                        )}
                                    </div>
                                    {notification.recipients && notification.recipients.length > 0 && (
                                        <>
                                            <Separator className="my-3" />
                                            <div className="space-y-2">
                                                <p className="text-xs font-medium text-muted-foreground">Recipients:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {notification.recipients.map((recipient) => (
                                                        <Badge
                                                            key={recipient.id}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {recipient.firstName && recipient.lastName
                                                                ? `${recipient.firstName} ${recipient.lastName}`
                                                                : recipient.email || recipient.id}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
