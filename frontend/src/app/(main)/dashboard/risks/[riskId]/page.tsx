"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { risksApi } from "@/features/risks/api/risks.api";
import { Risk } from "@/features/risks/types/risks.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ArrowLeft } from "lucide-react";
import { ActionForm } from "@/features/actions/components/action-form";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { useCreateAction } from "@/features/actions/hooks/use-create-action";
import { useUpdateAction } from "@/features/actions/hooks/use-update-action";
import { useDeleteAction } from "@/features/actions/hooks/use-delete-action";
import { Action } from "@/features/actions/types/actions.types";
import { ActionResponse } from "@/features/actions/schemas/actions.schemas";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

function RiskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();
    const [risk, setRisk] = useState<Risk | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Action Mutations
    const createActionMutation = useCreateAction();
    const updateActionMutation = useUpdateAction();
    const deleteActionMutation = useDeleteAction();

    // Action Dialog States
    const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);
    const [isEditActionOpen, setIsEditActionOpen] = useState(false);
    const [isDeleteActionOpen, setIsDeleteActionOpen] = useState(false);
    const [editingAction, setEditingAction] = useState<ActionResponse | null>(null);
    const [deletingAction, setDeletingAction] = useState<ActionResponse | null>(null);

    const riskId = params.riskId as string;

    const refreshRisk = async () => {
        try {
            const data = await risksApi.findOne(riskId);
            setRisk(data);
        } catch (err) {
            console.error("Error refreshing risk:", err);
        }
    };

    useEffect(() => {
        const fetchRisk = async () => {
            try {
                setLoading(true);
                const data = await risksApi.findOne(riskId);
                setRisk(data);
            } catch (err) {
                setError("Failed to load risk details");
                console.error("Error fetching risk:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRisk();
    }, [riskId]);

    const handleClose = () => {
        if (risk) {
            // Remove risk from navigation sidebar
            removeSubNavItem(2, "Risks", risk.title || "Untitled Risk");
        }
        // Navigate back to risks page
        router.push("/dashboard/risks");
    };

    const handleCreateActionSubmit = async (data: any, setOpen: (open: boolean) => void) => {
        try {
            await createActionMutation.mutateAsync({
                ...data,
                risk: { id: riskId }
            });
            setOpen(false);
            refreshRisk(); // Refresh to show new action
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleEditAction = (action: any) => {
        setEditingAction(action);
        setIsEditActionOpen(true);
    };

    const handleUpdateActionSubmit = async (data: any) => {
        if (editingAction) {
            try {
                await updateActionMutation.mutateAsync({
                    id: editingAction.id,
                    data: {
                        ...data,
                        risk: { id: riskId }
                    }
                });
                setIsEditActionOpen(false);
                refreshRisk();
            } catch (error) {
                // Error handled in hook
            }
        }
    };

    const handleDeleteAction = (action: any) => {
        setDeletingAction(action);
        setIsDeleteActionOpen(true);
    };

    const handleDeleteActionConfirm = async (action: any) => {
        try {
            await deleteActionMutation.mutateAsync(action.id);
            setIsDeleteActionOpen(false);
            refreshRisk();
        } catch (error) {
            // Error handled in hook
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    if (error || !risk) {
        return (
            <div className="flex flex-col gap-4 md:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>{error || "Risk not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Risks
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-2 justify-between">
                <Button onClick={handleClose} variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Close
                </Button>
                <Button size="sm" onClick={() => setIsCreateActionOpen(true)}>
                    Create Action
                </Button>
            </div>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>{risk.title}</CardTitle>
                    <CardDescription>Risk Details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                        <p className="text-sm">{risk.description || "No description provided"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Criticity</h3>
                        <p className="text-sm">{risk.criticity ?? "N/A"}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                    <CardDescription>Mitigation Actions</CardDescription>
                </CardHeader>
                <CardContent>
                    {risk.actions && risk.actions.length > 0 ? (
                        <ul className="space-y-4">
                            {risk.actions.map((action) => (
                                <li key={action.id} className="border-l-2 border-primary pl-4 group relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-sm font-semibold">{action.title || "Untitled Action"}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                                            <div className="text-xs text-muted-foreground mt-2">
                                                {format(new Date(action.createdAt), "PP")}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEditAction(action)}>
                                                <Pencil className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleDeleteAction(action)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No actions recorded.</p>
                    )}
                </CardContent>
            </Card>

            {/* Action Dialogs */}
            <CreateEntityDialog
                open={isCreateActionOpen}
                onOpenChange={setIsCreateActionOpen}
                title="Create Action"
                description="Add a new mitigation action for this risk."
                buttonLabel="Create Action"
            >
                {({ setOpen }) => (
                    <ActionForm
                        onSubmit={(data) => handleCreateActionSubmit(data, setOpen)}
                        isLoading={createActionMutation.isPending}
                    />
                )}
            </CreateEntityDialog>

            <EditEntityDialog
                open={isEditActionOpen}
                onOpenChange={setIsEditActionOpen}
                entity={editingAction}
                title="Edit Action"
                description="Update the mitigation action details."
            >
                {({ entity }) => (
                    <ActionForm
                        initialData={entity}
                        onSubmit={handleUpdateActionSubmit}
                        isLoading={updateActionMutation.isPending}
                    />
                )}
            </EditEntityDialog>

            <DeleteEntityDialog
                open={isDeleteActionOpen}
                onOpenChange={setIsDeleteActionOpen}
                entity={deletingAction}
                entityName="action"
                onConfirm={handleDeleteActionConfirm}
                isDeleting={deleteActionMutation.isPending}
            />
        </div>
    );
}

export default withAuth(RiskDetailPage);
