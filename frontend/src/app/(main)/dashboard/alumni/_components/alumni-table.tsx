"use client";
"use no memo";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { User } from "@/features/users/types/users.types";
import { TableCard } from "@/components/common/table-card";
import { BaseDialog } from "@/components/common/form-dialog";
import { TextSearch } from "@/components/common/table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { UserForm } from "@/features/users/components/user-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useCreateUser } from "@/features/users/hooks/use-create-user";
import { useUpdateUser } from "@/features/users/hooks/use-update-user";
import { useDeleteUser } from "@/features/users/hooks/use-delete-user";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { CreateUserRequest } from "@/features/users/schemas/users.schemas";
import { UpdateUserRequest } from "@/features/users/schemas/users.schemas";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface AlumniTableProps {
    users: User[];
}

/** 
 * currently this is just the same code as UsersTable 
 * but its copied here because its highly likely that it will change
*/
export function AlumniTable({ users } : AlumniTableProps) {
    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();
    const deleteMutation = useDeleteUser();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [updatingUser, setUpdatingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const columns = getColumns(handleUpdate, handleDelete);
    const table = useDataTableInstance({
        data: users,
        columns,
    })

    function handleCreate() {
        setIsCreateOpen(true);
    }

    function handleUpdate(user: User) {
        setUpdatingUser(user);
        setIsUpdateOpen(true);
    }

    function handleDelete(user: User) {
        setDeletingUser(user);
        setIsDeleteOpen(true);
    }

    async function handleCreateSubmit(data: CreateUserRequest) {
        await createMutation.mutateAsync(data);
        setIsCreateOpen(false);
    };

    async function handleUpdateSubmit(data: UpdateUserRequest) {
        if (updatingUser) {
            await updateMutation.mutateAsync({ id: updatingUser.id, data });
            setIsUpdateOpen(false);
        }
    };

    async function handleDeleteConfirm() {
        if(deletingUser) {
            await deleteMutation.mutateAsync(deletingUser.id);
            setIsDeleteOpen(false);
        }
    }

    return (
        <>
            <TableCard 
                title="Users"
                description="Track and manage all the users."
                actions={
                    <>
                        <Button onClick={handleCreate} size="sm">
                            <Plus className="h-4 w-4" />
                            Create User
                        </Button>
                    </>
                }
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <TextSearch
                            table={table}
                            columnId={"firstName"}
                            placeholder={"Search by first name..."}
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
                title="Create User"
                description="Add a new user to your timeline."
            >
                <UserForm 
                    onSubmit={handleCreateSubmit}
                    isLoading={createMutation.isPending}
                />
            </BaseDialog>

            <BaseDialog
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                title="Update User"
                description="Make changes to the user details."
            >
                <UserForm
                    initialData={updatingUser}
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
                description="This action cannot be undone. This will permanently delete the User."
            />
        </>
    );
}
