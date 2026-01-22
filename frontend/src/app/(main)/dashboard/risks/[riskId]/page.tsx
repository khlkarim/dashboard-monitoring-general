"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { ActionResponse, ActionType } from "@/features/actions/schemas/actions.schemas";
import { Pencil, Trash2, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { toast } from "sonner";
import { useGetActions } from "@/features/actions/hooks/use-get-actions";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function RiskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const riskId = params.riskId as string;
    const { data: risks } = useGetRisks();
    const { data: actions } = useGetActions(riskId);

    const preventiveActions = actions?.data?.filter(a => a.type === ActionType.PREVENTIVE) || [];
    const correctiveActions = actions?.data?.filter(a => a.type === ActionType.CORRECTIVE) || [];

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

    useEffect(() => {
        if (risks) {
            const risk = risks.data.find((risk) => risk.id === riskId);
            if (risk) {
                setRisk(risk);
                setLoading(false);
            } else {
                setError("Risk not found");
                setLoading(false);
            }
        }
    }, [risks]);

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
        } catch (error) {
            toast.error("Failed to create action");
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
            } catch (error) {
                toast.error("Failed to update action");
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
        } catch (error) {
            toast.error("Failed to delete action");
        }
    };

    const calculateRPN = (s: number | null | undefined, o: number | null | undefined, d: number | null | undefined) => {
        if (s == null || o == null || d == null) return null;
        return s * o * d;
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <Skeleton className="col-span-8 h-[400px]" />
                    <Skeleton className="col-span-4 h-[400px]" />
                </div>
            </div>
        );
    }

    if (error || !risk) {
        return (
            <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-[50vh]">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>{error || "Risk not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="secondary" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Risks
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const rpn = calculateRPN(risk.severity, risk.occurrence, risk.detection);
    const getRPNColor = (val: number | null) => {
        if (!val) return "text-muted-foreground";
        if (val >= 200) return "text-destructive";
        if (val >= 100) return "text-orange-500";
        return "text-green-500";
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard/risks')}>Risks</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium truncate max-w-[200px]">{risk.title}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{risk.title}</h1>
                        <p className="text-muted-foreground mt-1 text-lg">{risk.description || "No description provided."}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                        <Button onClick={() => setIsCreateActionOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Action
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-background to-muted/50 border-muted">
                    <CardHeader className="pb-2">
                        <CardDescription>Risk Priority Number</CardDescription>
                        <CardTitle className={`text-4xl font-bold ${getRPNColor(rpn)}`}>
                            {rpn ?? "N/A"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            {rpn ? "Calculated (S x O x D)" : "Insufficient data"}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardDescription>Severity</CardDescription>
                            <span className="font-bold text-lg">{risk.severity ?? "-"}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={(risk.severity || 0) * 10} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Impact of the failure</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardDescription>Occurrence</CardDescription>
                            <span className="font-bold text-lg">{risk.occurrence ?? "-"}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={(risk.occurrence || 0) * 10} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Likelihood of cause</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardDescription>Detection</CardDescription>
                            <span className="font-bold text-lg">{risk.detection ?? "-"}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={(risk.detection || 0) * 10} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Ability to detect</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-xl">Mitigation Actions</CardTitle>
                            <CardDescription>Manage preventive and corrective measures for this risk.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="preventive" className="w-full">
                                <div className="flex items-center justify-between mb-4">
                                    <TabsList>
                                        <TabsTrigger value="preventive">Preventive</TabsTrigger>
                                        <TabsTrigger value="corrective">Corrective</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="preventive" className="mt-0 space-y-4">
                                    {preventiveActions.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                                            <p>No preventive actions recorded.</p>
                                            <Button variant="link" onClick={() => setIsCreateActionOpen(true)}>Create one now</Button>
                                        </div>
                                    ) : (
                                        preventiveActions.map((action) => (
                                            <ActionItem
                                                key={action.id}
                                                action={action}
                                                onEdit={handleEditAction}
                                                onDelete={handleDeleteAction}
                                            />
                                        ))
                                    )}
                                </TabsContent>

                                <TabsContent value="corrective" className="mt-0 space-y-4">
                                    {correctiveActions.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                                            <p>No corrective actions recorded.</p>
                                            <Button variant="link" onClick={() => setIsCreateActionOpen(true)}>Create one now</Button>
                                        </div>
                                    ) : (
                                        correctiveActions.map((action) => (
                                            <ActionItem
                                                key={action.id}
                                                action={action}
                                                onEdit={handleEditAction}
                                                onDelete={handleDeleteAction}
                                            />
                                        ))
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Risk Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Created</span>
                                <span className="text-sm font-medium">{risk.createdAt ? format(new Date(risk.createdAt), "PP") : "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Last Updated</span>
                                <span className="text-sm font-medium">{risk.updatedAt ? format(new Date(risk.updatedAt), "PP") : "N/A"}</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-sm text-muted-foreground block mb-2">ID</span>
                                <code className="text-xs bg-muted p-1 rounded block truncate">{risk.id}</code>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

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
                        riskId={riskId}
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
                        riskId={riskId}
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

function ActionItem({ action, onEdit, onDelete }: { action: any, onEdit: (a: any) => void, onDelete: (a: any) => void }) {
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
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => { e.stopPropagation(); onEdit(action); }}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={(e) => { e.stopPropagation(); onDelete(action); }}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default withAuth(RiskDetailPage);
