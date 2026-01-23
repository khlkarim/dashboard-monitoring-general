"use client";

import { useCallback, useMemo, useState } from "react";
import { getColumns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { SprintForm } from "@/features/sprints/components/sprint-form";
import { CreateSprintRequest, UpdateSprintRequest } from "@/features/sprints/schemas/sprints.schemas";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useCreateSprint } from "@/features/sprints/hooks/use-create-sprint";
import { useUpdateSprint } from "@/features/sprints/hooks/use-update-sprint";
import { useDeleteSprint } from "@/features/sprints/hooks/use-delete-sprint";
import { toast } from "sonner";

export function SprintsTable() {
    const createMutation = useCreateSprint();
    const updateMutation = useUpdateSprint();
    const deleteMutation = useDeleteSprint();
    const { data, isLoading, isError, error, isFetching } = useGetSprints();

    // State for actions
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
    const [deletingSprint, setDeletingSprint] = useState<Sprint | null>(null);

    // Handlers - wrapped in useCallback to maintain stable references
    const handleEdit = useCallback((sprint: Sprint) => {
        setEditingSprint(sprint);
        setIsEditOpen(true);
    }, []);

    const handleDelete = useCallback((sprint: Sprint) => {
        setDeletingSprint(sprint);
        setIsDeleteOpen(true);
    }, []);

    const handleCreateSubmit = (data: CreateSprintRequest, setOpen: (open: boolean) => void) => {
        try {
            createMutation.mutate(data);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create sprint.");
        }
    };

    const handleUpdateSubmit = (data: UpdateSprintRequest) => {
        if (editingSprint) {
            try {
                updateMutation.mutate({ id: editingSprint.id, data });
                setIsEditOpen(false);
            } catch (error) {
                toast.error("Failed to update sprint.");
            }
        }
    };

    const handleDeleteConfirm = (sprint: Sprint) => {
        try {
            deleteMutation.mutate(sprint.id);
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error("Failed to delete sprint.");
        }
    };

    const columns = useMemo(() => getColumns(handleEdit, handleDelete), [handleEdit, handleDelete]);

    return (
        <>
            <EntityTable
                data={data?.data ?? []}
                columns={columns}
                title="Sprints"
                description="Track and manage all the sprints."
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                onCreate={() => setIsCreateOpen(true)}
                entityName="Sprint"
                searchColumn="name"
                filters={[
                    {
                        columnId: "status",
                        title: "Status",
                        options: [
                            { label: "Planned", value: "PLANNED" },
                            { label: "Active", value: "ACTIVE" },
                            { label: "Completed", value: "COMPLETED" },
                        ],
                    },
                ]}
            />

            <CreateEntityDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create Sprint"
                description="Add a new sprint to your timeline."
                buttonLabel="Create Sprint"
            >
                {({ setOpen }) => (
                    <SprintForm
                        onSubmit={(data) => handleCreateSubmit(data, setOpen)}
                        isLoading={createMutation.isPending}
                    />
                )}
            </CreateEntityDialog>

            <EditEntityDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                entity={editingSprint}
                title="Edit Sprint"
                description="Make changes to the sprint details."
            >
                {({ entity }) => (
                    <SprintForm
                        initialData={entity}
                        onSubmit={handleUpdateSubmit}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </EditEntityDialog>

            <DeleteEntityDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                entity={deletingSprint}
                entityName="sprint"
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteMutation.isPending}
            />
        </>
    );
}
