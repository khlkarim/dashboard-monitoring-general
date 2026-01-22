"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { User } from "@/features/users/types/users.types";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { useRouter } from "next/navigation";
import { useNavigationStore } from "@/navigation/store/navigation.store";

function OpenUserButton({ user }: { user: User }) {
    const router = useRouter();
    const { addSubNavItem } = useNavigationStore();

    const handleOpenUser = () => {
        addSubNavItem(2, "Alumni", {
            title: user.firstName && user.lastName ? user.firstName + " " + user.lastName : "-",
            url: `/dashboard/alumni/${user.id}`,
        });
        router.push(`/dashboard/alumni/${user.id}`);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleOpenUser}
        >
            Open
        </Button>
    );
}

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First Name" />
        ),
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Name" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            const role = row.original.role;
            return <div className="font-medium">{role?.name ?? "-"}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex items-center gap-2">
                    <OpenUserButton user={row.original} />
                    <DataTableRowActions
                        row={row}
                    />
                </div>
            );
        },
    },
];
