"use client";
"use no memo";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Risk } from "@/features/risks/types/risks.types";
import { TableCard } from "@/components/common/table-card";
import { BaseDialog } from "@/components/common/form-dialog";
import { TextSearch } from "@/components/common/table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { RiskForm } from "@/features/risks/components/risk-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useCreateRisk } from "@/features/risks/hooks/use-create-risk";
import { useUpdateRisk } from "@/features/risks/hooks/use-update-risk";
import { useDeleteRisk } from "@/features/risks/hooks/use-delete-risk";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { CreateRiskRequest } from "@/features/risks/schemas/risks.schemas";
import { UpdateRiskRequest } from "@/features/risks/schemas/risks.schemas";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface RisksTableProps {
    risks: Risk[];
}

export function RisksTable({ risks } : RisksTableProps) {
    const createMutation = useCreateRisk();
    const updateMutation = useUpdateRisk();
    const deleteMutation = useDeleteRisk();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [updatingRisk, setUpdatingRisk] = useState<Risk | null>(null);
    const [deletingRisk, setDeletingRisk] = useState<Risk | null>(null);

    const columns = getColumns(handleUpdate, handleDelete);
    const table = useDataTableInstance({
        data: risks,
        columns,
    })

    function handleCreate() {
        setIsCreateOpen(true);
    }

    function handleUpdate(risk: Risk) {
        setUpdatingRisk(risk);
        setIsUpdateOpen(true);
    }

    function handleDelete(risk: Risk) {
        setDeletingRisk(risk);
        setIsDeleteOpen(true);
    }

    async function handleCreateSubmit(data: CreateRiskRequest) {
        await createMutation.mutateAsync(data);
        setIsCreateOpen(false);
    };

    async function handleUpdateSubmit(data: UpdateRiskRequest) {
        if (updatingRisk) {
            await updateMutation.mutateAsync({ id: updatingRisk.id, data });
            setIsUpdateOpen(false);
        }
    };

    async function handleDeleteConfirm() {
        if(deletingRisk) {
            await deleteMutation.mutateAsync(deletingRisk.id);
            setIsDeleteOpen(false);
        }
    }

    return (
        <>
            <TableCard 
                title="Risks"
                description="Track and manage all the risks."
                actions={
                    <>
                        <Button onClick={handleCreate} size="sm">
                            <Plus className="h-4 w-4" />
                            Create Risk
                        </Button>
                    </>
                }
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <TextSearch
                            table={table}
                            columnId={"title"}
                            placeholder={"Search by title..."}
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
                    <DataTable table={table} columns={columns} />
                </div>
                <DataTablePagination table={table} />
            </TableCard>

            <BaseDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create Risk"
                description="Add a new risk to your timeline."
            >
                <RiskForm 
                    onSubmit={handleCreateSubmit}
                    isLoading={createMutation.isPending}
                />
            </BaseDialog>

            <BaseDialog
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                title="Update Risk"
                description="Make changes to the risk details."
            >
                <RiskForm
                    initialData={updatingRisk}
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
                description="This action cannot be undone. This will permanently delete the risk."
            />
        </>
    );
}
