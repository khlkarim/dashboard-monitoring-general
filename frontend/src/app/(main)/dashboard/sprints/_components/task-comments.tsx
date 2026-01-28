"use client";

import { useState } from "react";
import { TaskComment } from "./task-comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetComments } from "@/features/comments/hooks/use-get-comments";
import { useCreateComment } from "@/features/comments/hooks/use-create-comment";

interface TaskCommentsProps {
    taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
    const [content, setContent] = useState("");
    const user = useAuthStore((state) => state.user);

    const {
        data: comments,
        isPending,
        isError,
        error,
    } = useGetComments(taskId);

    const createCommentMutation = useCreateComment();

    async function handleCreateComment() {
        if (!content.trim() || !user) return;

        await createCommentMutation.mutateAsync({
            content,
            task: { id: taskId },
            author: { id: user.id },
        });

        setContent("");
    }

    return (
        <div className="flex flex-col rounded-lg border bg-background">
            <div className="border-b px-4 py-3">
                <h3 className="text-sm font-semibold">Comments</h3>
            </div>

            {/* Scrollable comments list */}
            <div className="max-h-[400px] flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {isPending && (
                    <p className="text-sm text-muted-foreground">
                        Loading comments…
                    </p>
                )}

                {isError && (
                    <ErrorDisplay
                        title="Failed to load comments"
                        error={error}
                    />
                )}

                {!isPending && comments?.data.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No comments yet
                    </p>
                )}

                {comments?.data.map((comment) => {
                    return <TaskComment key={comment.id} comment={comment} />
                })}
            </div>

            {user && (
                <div className="border-t p-4 space-y-2">
                    <Textarea
                        rows={3}
                        value={content}
                        placeholder="Write a comment…"
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            onClick={handleCreateComment}
                            disabled={createCommentMutation.isPending}
                        >
                            Comment
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
