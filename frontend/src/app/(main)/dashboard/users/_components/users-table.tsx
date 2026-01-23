"use client";

import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import { EntityTable } from "@/components/common/entity-table";
import { User } from "@/features/users/types/users.types";
import { CreateEntityDialog } from "@/components/common/create-entity-dialog";
import { EditEntityDialog } from "@/components/common/edit-entity-dialog";
import { DeleteEntityDialog } from "@/components/common/delete-entity-dialog";
import { UserForm } from "@/features/users/components/user-form";
import { CreateUserRequest, UpdateUserRequest } from "@/features/users/schemas/users.schemas";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { useCreateUser } from "@/features/users/hooks/use-create-user";
import { useUpdateUser } from "@/features/users/hooks/use-update-user";
import { useDeleteUser } from "@/features/users/hooks/use-delete-user";

export function UsersTable() {
    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();
    const deleteMutation = useDeleteUser();
    const { data, isLoading, isError, error, isFetching } = useGetUsers();

    // State for actions
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Handlers
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsEditOpen(true);
    };

    const handleDelete = (user: User) => {
        setDeletingUser(user);
        setIsDeleteOpen(true);
    };

    const handleCreateSubmit = (data: CreateUserRequest, setOpen: (open: boolean) => void) => {
        try {
            createMutation.mutate(data);
            setOpen(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleUpdateSubmit = (data: UpdateUserRequest) => {
        if (editingUser) {
            try {
                updateMutation.mutate({ id: String(editingUser.id), data });
                setIsEditOpen(false);
            } catch (error) {
                // Error handled in hook
            }
        }
    };

    const handleDeleteConfirm = (user: User) => {
        try {
            deleteMutation.mutate(String(user.id));
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
                title="Users"
                description="Manage users and their roles."
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                onCreate={() => setIsCreateOpen(true)}
                entityName="User"
                searchColumn="email"
                filters={[
                    {
                        columnId: "role",
                        title: "Role",
                        options: [
                            { label: "Administrator", value: "administrator" },
                            { label: "President", value: "president" },
                            { label: "Member", value: "member" },
                            { label: "Alumni", value: "alumni" },
                        ],
                    },
                    {
                        columnId: "status",
                        title: "Status",
                        options: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                        ],
                    },
                ]}
            />

            <CreateEntityDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                title="Create User"
                description="Add a new user to the system."
                buttonLabel="Create User"
            >
                {({ setOpen }) => (
                    <UserForm
                        onSubmit={(data) => handleCreateSubmit(data, setOpen)}
                        isLoading={createMutation.isPending}
                    />
                )}
            </CreateEntityDialog>

            <EditEntityDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                entity={editingUser}
                title="Edit User"
                description="Make changes to the user details."
            >
                {({ entity }) => (
                    <UserForm
                        initialData={entity}
                        onSubmit={handleUpdateSubmit}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </EditEntityDialog>

            <DeleteEntityDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                entity={deletingUser}
                entityName="user"
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteMutation.isPending}
            />
        </>
    );
}
