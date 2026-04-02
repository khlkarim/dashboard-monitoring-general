"use client";
"use no memo";

import { useState } from "react";
import { getColumns } from "./columns";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { TableCard } from "@/components/common/table-card";
import { BaseDialog } from "@/components/common/form-dialog";
import { TextSearch } from "@/components/common/table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { KpiForm } from "@/features/kpis/components/kpi-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useCreateKpi } from "@/features/kpis/hooks/use-create-kpi";
import { useUpdateKpi } from "@/features/kpis/hooks/use-update-kpi";
import { useDeleteKpi } from "@/features/kpis/hooks/use-delete-kpi";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { Processus } from "@/features/processus/types/processus.types";
import { CreateKpiRequest } from "@/features/kpis/schemas/kpis.schemas";
import { UpdateKpiRequest } from "@/features/kpis/schemas/kpis.schemas";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface KpisTableProps {
    processus: Processus;
    kpis: Kpi[];
}

export function KpisTable({ processus, kpis }: KpisTableProps) {
    const createMutation = useCreateKpi();
    const updateMutation = useUpdateKpi();
    const deleteMutation = useDeleteKpi();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [updatingKpi, setUpdatingKpi] = useState<Kpi | null>(null);
    const [deletingKpi, setDeletingKpi] = useState<Kpi | null>(null);

    const columns = getColumns(handleUpdate, handleDelete);
    const table = useDataTableInstance({
        data: kpis,
        columns,
    });

    function handleCreate() {
        setIsCreateOpen(true);
    }

    function handleUpdate(kpi: Kpi) {
        setUpdatingKpi(kpi);
        setIsUpdateOpen(true);
    }

    function handleDelete(kpi: Kpi) {
        setDeletingKpi(kpi);
        setIsDeleteOpen(true);
    }

    async function handleCreateSubmit(data: CreateKpiRequest) {
        await createMutation.mutateAsync(data);
        setIsCreateOpen(false);
    };

    async function handleUpdateSubmit(data: UpdateKpiRequest) {
        if (updatingKpi) {
            await updateMutation.mutateAsync({ id: updatingKpi.id, data });
            setIsUpdateOpen(false);
        }
    };

    async function handleDeleteConfirm() {
        if (deletingKpi) {
            await deleteMutation.mutateAsync(deletingKpi.id);
            setIsDeleteOpen(false);
        }
    }

    return (
        <>
            <TableCard
                title={processus.label}
                description={processus.description}
                actions={
                    <>
                        <Button onClick={handleCreate} size="sm">
                            <Plus className="h-4 w-4" />
                            Create Kpi
                        </Button>
                    </>
                }
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <TextSearch
                            table={table}
                            columnId={"name"}
                            placeholder={"Search by name..."}
                        />

                        {table.getState().columnFilters.length > 0 &&
                            <Button
                                variant="ghost"
                                onClick={() => table.resetColumnFilters()}
                                className="h-8 px-2 lg:px-3"
                            >
                                Reset
                                <X className="ml-2 h-4 w-4" />
                            </Button>
                        }
                    </div>

                    <div className="flex items-center gap-2">
                        <DataTableViewOptions table={table} />
                    </div>
                </div>
                <div className="overflow-hidden rounded-md border">
                    <DataTable table={table} columns={table.getAllColumns()} />
                </div>
                <DataTablePagination table={table} />
            </TableCard>

            <BaseDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create Kpi"
                description="Add a new Kpi to your timeline."
            >
                <KpiForm
                    onSubmit={handleCreateSubmit}
                    isLoading={createMutation.isPending}
                />
            </BaseDialog>

            <BaseDialog
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                title="Update Kpi"
                description="Make changes to the Kpi details."
            >
                <KpiForm
                    initialData={updatingKpi}
                    onSubmit={handleUpdateSubmit}
                    isLoading={updateMutation.isPending}
                />
            </BaseDialog>

            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteMutation.isPending}
                confirmLabel="Delete"
                confirmVariant="destructive"
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the Kpi."
            />
        </>
    );
}
