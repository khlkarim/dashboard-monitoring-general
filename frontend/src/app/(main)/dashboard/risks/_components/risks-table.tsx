"use client";

import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";
import { Risk } from "@/features/risks/types/risks.types";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { RiskForm } from "@/features/risks/components/risk-form";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { useCreateRisk } from "@/features/risks/hooks/use-create-risk";
import { useUpdateRisk } from "@/features/risks/hooks/use-update-risk";
import { useDeleteRisk } from "@/features/risks/hooks/use-delete-risk";
import { CreateRiskRequest } from "@/features/risks/schemas/risks.schemas";
import { UpdateRiskRequest } from "@/features/risks/schemas/risks.schemas";

export function RisksTable() {
    const createMutation = useCreateRisk();
    const updateMutation = useUpdateRisk();
    const deleteMutation = useDeleteRisk();
    const { data, isLoading, isError, error, isFetching } = useGetRisks();

    // State for actions
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
    const [deletingRisk, setDeletingRisk] = useState<Risk | null>(null);

    // Handlers
    const handleEdit = (risk: Risk) => {
        setEditingRisk(risk);
        setIsEditOpen(true);
    };

    const handleDelete = (risk: Risk) => {
        setDeletingRisk(risk);
        setIsDeleteOpen(true);
    };

    const handleCreateSubmit = (data: CreateRiskRequest, setOpen: (open: boolean) => void) => {
        try {
            createMutation.mutate(data);
            setOpen(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleUpdateSubmit = (data: UpdateRiskRequest) => {
        if (editingRisk) {
            try {
                updateMutation.mutate({ id: editingRisk.id, data });
                setIsEditOpen(false);
            } catch (error) {
                // Error handled in hook
            }
        }
    };

    const handleDeleteConfirm = (risk: Risk) => {
        try {
            deleteMutation.mutate(risk.id);
            setIsDeleteOpen(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = useMemo(() => getColumns(handleEdit, handleDelete), []);

    return (
        <>
            <EntityTable
                data={data?.data ?? []}
                columns={columns}
                title="Risks"
                description="Track and manage all the risks."
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                onCreate={() => setIsCreateOpen(true)}
                entityName="Risk"
            />

            <CreateEntityDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create Risk"
                description="Add a new risk to your timeline."
                buttonLabel="Create Risk"
            >
                {({ setOpen }) => (
                    <RiskForm
                        onSubmit={(data) => handleCreateSubmit(data, setOpen)}
                        isLoading={createMutation.isPending}
                    />
                )}
            </CreateEntityDialog>

            <EditEntityDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                entity={editingRisk}
                title="Edit Risk"
                description="Make changes to the risk details."
            >
                {({ entity }) => (
                    <RiskForm
                        initialData={entity}
                        onSubmit={handleUpdateSubmit}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </EditEntityDialog>

            <DeleteEntityDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                entity={deletingRisk}
                entityName="risk"
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteMutation.isPending}
            />
        </>
    );
}
