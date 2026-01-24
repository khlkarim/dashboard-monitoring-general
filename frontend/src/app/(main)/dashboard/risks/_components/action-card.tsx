import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseDialog } from "@/components/common/form-dialog";
import { Action } from "@/features/actions/types/actions.types";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { ActionForm } from "@/features/actions/components/action-form";
import { useUpdateAction } from "@/features/actions/hooks/use-update-action";
import { useDeleteAction } from "@/features/actions/hooks/use-delete-action";

interface ActionCardProps {
    action: Action;
}

export function ActionCard({ action }: ActionCardProps) {
    const updateActionMutation = useUpdateAction();
    const deleteActionMutation = useDeleteAction();

    const [isUpdateActionOpen, setIsUpdateActionOpen] = useState(false);
    const [isDeleteActionOpen, setIsDeleteActionOpen] = useState(false);

    function handleEditAction() {
        setIsUpdateActionOpen(true);
    };

    function handleDeleteAction () {
        setIsDeleteActionOpen(true);
    };

    async function handleUpdateActionSubmit(data: any) {
        updateActionMutation.mutateAsync({ id: action.id, data });
        setIsUpdateActionOpen(false);
    }

    async function handleDeleteActionConfirm() {
        deleteActionMutation.mutateAsync(action.id);
        setIsDeleteActionOpen(false);
    }

    return (
        <div className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{action.title}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{action.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                        Created {format(new Date(action.createdAt), "PP")}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-muted-foreground hover:text-primary" 
                    onClick={handleEditAction}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                    onClick={handleDeleteAction}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <BaseDialog 
                open={isUpdateActionOpen}
                onOpenChange={setIsUpdateActionOpen}
                title="Edit Action"
                description="Update the mitigation action details."
            >
                <ActionForm
                    initialData={action}
                    onSubmit={handleUpdateActionSubmit}
                    isLoading={updateActionMutation.isPending}
                />
            </BaseDialog>

            <ConfirmDialog 
                open={isDeleteActionOpen}
                onOpenChange={setIsDeleteActionOpen}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the action."
                confirmLabel="Delete"
                onConfirm={handleDeleteActionConfirm}
                isLoading={deleteActionMutation.isPending}
                confirmVariant = "destructive"
            />
        </div>
    );
}