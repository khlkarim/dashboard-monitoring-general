"use client";
"use no memo";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { TableCard } from "@/components/common/table-card";
import { BaseDialog } from "@/components/common/form-dialog";
import { TextSearch } from "@/components/common/table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { SprintForm } from "@/features/sprints/components/sprint-form";
import { useCreateSprint } from "@/features/sprints/hooks/use-create-sprint";
import { useUpdateSprint } from "@/features/sprints/hooks/use-update-sprint";
import { useDeleteSprint } from "@/features/sprints/hooks/use-delete-sprint";
import { UpdateSprintRequest } from "@/features/sprints/schemas/sprints.schemas";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { CreateSprintRequest, SprintStatus } from "@/features/sprints/schemas/sprints.schemas";

interface SprintsTableProps {
    sprints: Sprint[];
}

export function SprintsTable({ sprints } : SprintsTableProps) {
    const createMutation = useCreateSprint();
    const updateMutation = useUpdateSprint();
    const deleteMutation = useDeleteSprint();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [updatingSprint, setUpdatingSprint] = useState<Sprint | null>(null);
    const [deletingSprint, setDeletingSprint] = useState<Sprint | null>(null);

    const columns = getColumns(handleUpdate, handleDelete);
    const table = useDataTableInstance({
        data: sprints,
        columns,
    })

    function handleCreate() {
        setIsCreateOpen(true);
    }

    function handleUpdate(sprint: Sprint) {
        setUpdatingSprint(sprint);
        setIsUpdateOpen(true);
    }

    function handleDelete(sprint: Sprint) {
        setDeletingSprint(sprint);
        setIsDeleteOpen(true);
    }

    async function handleCreateSubmit(data: CreateSprintRequest) {
        await createMutation.mutateAsync(data);
        setIsCreateOpen(false);
    };

    async function handleUpdateSubmit(data: UpdateSprintRequest) {
        if (updatingSprint) {
            await updateMutation.mutateAsync({ id: updatingSprint.id, data });
            setIsUpdateOpen(false);
        }
    };

    async function handleDeleteConfirm() {
        if(deletingSprint) {
            await deleteMutation.mutateAsync(deletingSprint.id);
            setIsDeleteOpen(false);
        }
    }

    return (
        <>
            <TableCard 
                title="Sprints"
                description="Track and manage all the sprints."
                actions={
                    <>
                        <Button onClick={handleCreate} size="sm">
                            <Plus className="h-4 w-4" />
                            Create Sprint
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

                        <DataTableFacetedFilter
                            title={"Status"}
                            column={table.getColumn("status")}
                            options={[
                                {
                                    label: "Active",
                                    value: SprintStatus.ACTIVE
                                },
                                {
                                    label: "Planned",
                                    value: SprintStatus.PLANNED
                                },
                                {
                                    label: "Completed",
                                    value: SprintStatus.COMPLETED
                                }
                            ]}
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
                title="Create Sprint"
                description="Add a new Sprint to your timeline."
            >
                <SprintForm 
                    onSubmit={handleCreateSubmit}
                    isLoading={createMutation.isPending}
                />
            </BaseDialog>

            <BaseDialog
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                title="Update Sprint"
                description="Make changes to the Sprint details."
            >
                <SprintForm
                    initialData={updatingSprint}
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
                description="This action cannot be undone. This will permanently delete the Sprint."
            />
        </>
    );
}
