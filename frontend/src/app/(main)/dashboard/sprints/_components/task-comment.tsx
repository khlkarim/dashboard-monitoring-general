import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/features/users/types/roles.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Comment } from "@/features/comments/types/comments.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateComment } from "@/features/comments/hooks/use-update-comment";
import { useDeleteComment } from "@/features/comments/hooks/use-delete-comment";

interface TaskCommentProps {
    comment: Comment;
}

function formatDate(date?: string | null) {
    if (!date) return "—";
    return format(new Date(date), "dd MMM yyyy");
}

function userInitials(firstName?: string | null, lastName?: string | null) {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

export function TaskComment({ comment }: TaskCommentProps) {
    const user = useAuthStore((state) => state.user);
    const updateMutation = useUpdateComment();
    const deleteMutation = useDeleteComment();

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    async function handleDelete() {
        await deleteMutation.mutateAsync(comment.id);
    }

    async function handleUpdate() {
        if (editedContent?.trim() === "") return;
        await updateMutation.mutateAsync({ id: comment.id, data: { content: editedContent } });
        setIsEditing(false);
    }

    return (
        <div key={comment.id} className="flex gap-3 items-start">
            <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={comment.author?.photo?.path} />
                <AvatarFallback>
                    {userInitials(comment.author?.firstName, comment.author?.lastName)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                        {comment.author?.firstName} {comment.author?.lastName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                {isEditing ? (
                    <div className="flex gap-2">
                        <input
                            className="flex-1 text-sm border rounded px-2 py-1"
                            value={editedContent || ""}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" onClick={handleUpdate}>
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setEditedContent(comment.content);
                                setIsEditing(false);
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words line-clamp-4">
                        {comment.content}
                    </p>
                )}
            </div>

            {(user?.role?.id === RoleEnum.ADMINISTRATOR ||
                user?.role?.id === RoleEnum.PRESIDENT ||
                user?.id === comment.author?.id) && (
                <div className="flex gap-2 shrink-0">
                    {!isEditing && (
                        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            )}
        </div>
    );
}
