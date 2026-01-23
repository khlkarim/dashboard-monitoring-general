"use client";

import { useMemo, useState, useEffect } from "react";
import { getColumns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { KpiForm, KpiType } from "@/features/kpis/components/kpi-form";
import { CreateKpiRequest, UpdateKpiRequest } from "@/features/kpis/schemas/kpis.schemas";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { useCreateKpi } from "@/features/kpis/hooks/use-create-kpi";
import { useUpdateKpi } from "@/features/kpis/hooks/use-update-kpi";
import { useDeleteKpi } from "@/features/kpis/hooks/use-delete-kpi";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import { toast } from "sonner";

export function KpisTable() {
    const createMutation = useCreateKpi();
    const updateMutation = useUpdateKpi();
    const deleteMutation = useDeleteKpi();

    const { data: processus, isLoading: isLoadingProcessus, isError: isErrorProcessus, error: errorProcessus } = useGetProcessus();
    const { data: kpis, isLoading, isError, error, isFetching } = useGetKpis({});

    const [kpisByProcessus, setKpisByProcessus] = useState<Map<string, Kpi[]>>(new Map());

    useEffect(() => {
        console.log("processus: ", processus);
        console.log("kpis: ", kpis);
        if (processus && kpis) {
            const map = new Map<string, Kpi[]>();
            processus.data.forEach((processus) => {
                map.set(processus.label, kpis.data.filter((kpi) => kpi.processus?.id === processus.id));
            });
            setKpisByProcessus(map);
        }
    }, [processus, kpis]);

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
            toast.error("Failed to create KPI");
        }
    };

    const handleUpdateSubmit = (data: UpdateKpiRequest) => {
        if (editingKpi) {
            try {
                updateMutation.mutate({ id: editingKpi.id, data });
                setIsEditOpen(false);
            } catch (error) {
                toast.error("Failed to update KPI");
            }
        }
    };

    const handleDeleteConfirm = (kpi: Kpi) => {
        try {
            deleteMutation.mutate(kpi.id);
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error("Failed to delete KPI");
        }
    };

    const columns = useMemo(() => getColumns(handleEdit, handleDelete), [handleEdit, handleDelete]);

    return (
        <>
            {Array.from(kpisByProcessus.entries()).map(([processusLabel, kpis]) => (
                <EntityTable
                    key={processusLabel}
                    data={kpis}
                    columns={columns}
                    title={processusLabel}
                    description={`Track and manage all the KPIs for ${processusLabel}.`}
                    isLoading={isLoading || isFetching || isLoadingProcessus}
                    isError={isError || isErrorProcessus}
                    error={error || errorProcessus}
                    entityName="KPI"
                    searchColumn="name"
                />
            ))}

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
                        type={KpiType.PROCESSUS}
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
                        type={KpiType.PROCESSUS}
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
