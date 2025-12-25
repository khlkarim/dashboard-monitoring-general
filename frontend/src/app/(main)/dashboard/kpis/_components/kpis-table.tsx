"use client";

import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { KpiForm } from "@/features/kpis/components/kpi-form";
import { CreateKpiRequest, UpdateKpiRequest } from "@/features/kpis/schemas/kpis.schemas";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { useCreateKpi } from "@/features/kpis/hooks/use-create-kpi";
import { useUpdateKpi } from "@/features/kpis/hooks/use-update-kpi";
import { useDeleteKpi } from "@/features/kpis/hooks/use-delete-kpi";

export function KpisTable() {
    const createMutation = useCreateKpi();
    const updateMutation = useUpdateKpi();
    const deleteMutation = useDeleteKpi();
    const { data, isLoading, isError, error, isFetching } = useGetKpis();

    // State for actions
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingKpi, setEditingKpi] = useState<Kpi | null>(null);
    const [deletingKpi, setDeletingKpi] = useState<Kpi | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Handlers
    const handleEdit = (kpi: Kpi) => {
        setEditingKpi(kpi);
        setIsEditOpen(true);
    };

    const handleDelete = (kpi: Kpi) => {
        setDeletingKpi(kpi);
        setIsDeleteOpen(true);
    };

    const handleCreateSubmit = (data: CreateKpiRequest, setOpen: (open: boolean) => void) => {
        try {
            createMutation.mutate(data);
            setOpen(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleUpdateSubmit = (data: UpdateKpiRequest) => {
        if (editingKpi) {
            try {
                updateMutation.mutate({ id: editingKpi.id, data });
                setIsEditOpen(false);
            } catch (error) {
                // Error handled in hook
            }
        }
    };

    const handleDeleteConfirm = (kpi: Kpi) => {
        try {
            deleteMutation.mutate(kpi.id);
            setIsDeleteOpen(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = useMemo(() => getColumns(handleEdit, handleDelete), [handleEdit, handleDelete]);

    return (
        <>
            <EntityTable
                data={data?.data ?? []}
                columns={columns}
                title="KPIs"
                description="Track and manage all the KPIs."
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                onCreate={() => setIsCreateOpen(true)}
                entityName="KPI"
            />

            <CreateEntityDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create KPI"
                description="Define a new key performance indicator."
                buttonLabel="Create KPI"
            >
                {({ setOpen }) => (
                    <KpiForm
                        onSubmit={(data) => handleCreateSubmit(data, setOpen)}
                        isLoading={createMutation.isPending}
                    />
                )}
            </CreateEntityDialog>

            <EditEntityDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                entity={editingKpi}
                title="Edit KPI"
                description="Make changes to the KPI details."
            >
                {({ entity }) => (
                    <KpiForm
                        initialData={entity}
                        onSubmit={handleUpdateSubmit}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </EditEntityDialog>

            <DeleteEntityDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                entity={deletingKpi}
                entityName="KPI"
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteMutation.isPending}
            />
        </>
    );
}
