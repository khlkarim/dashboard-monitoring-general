import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format, formatDistanceToNow } from "date-fns";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Notification } from "@/features/notifications/types/notifications.types";
import { useDeleteNotification } from "@/features/notifications/hooks/use-delete-notification";

interface NotificationCardProps {
    notification: Notification;
}

export function NotificationCard({ notification } : NotificationCardProps) {
    const deleteMutation = useDeleteNotification();

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    async function handleDeleteConfirm() {
        await deleteMutation.mutateAsync(notification.id);
    };

    return (
        <>
            <Card className="transition-all hover:shadow-md">
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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
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
        
            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteMutation.isPending}
                confirmLabel="Delete"
                confirmVariant="destructive"
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the notification."
            />
        </>
    );
}