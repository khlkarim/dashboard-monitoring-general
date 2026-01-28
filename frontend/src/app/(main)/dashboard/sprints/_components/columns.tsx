"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Sprint } from "@/features/sprints/types/sprints.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { SprintStatus } from "@/features/sprints/schemas/sprints.schemas";
import { Protect, RoleEnum } from "@/features/auth";

function OpenSprintButton({ sprint }: { sprint: Sprint }) {
    const router = useRouter();
    const { addSubNavItem } = useNavigationStore();

    const handleOpenSprint = () => {
        addSubNavItem(2, "Sprints", {
            title: sprint.name,
            url: `/dashboard/sprints/${sprint.id}`,
        });
        router.push(`/dashboard/sprints/${sprint.id}`);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleOpenSprint}
        >
            Open
        </Button>
    );
}

export const getColumns = (
    onEdit: (sprint: Sprint) => void,
    onDelete: (sprint: Sprint) => void
): ColumnDef<Sprint>[] => [
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
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ getValue }) => (
                <div className="truncate max-w-[200px]">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as SprintStatus;
                return <Badge variant="outline">{status}</Badge>;
            },
        },
        {
            accessorKey: "startDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Start Date" />
            ),
            cell: ({ row }) => {
                return (
                    <span className="text-muted-foreground">
                        {format(new Date(row.getValue("startDate")), "PPP")}
                    </span>
                );
            },
        },
        {
            accessorKey: "endDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="End Date" />
            ),
            cell: ({ row }) => {
                return (
                    <span className="text-muted-foreground">
                        {format(new Date(row.getValue("endDate")), "PPP")}
                    </span>
                );
            },
        },
        {
            accessorKey: "validationDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Validation Date" />
            ),
            cell: ({ row }) => {
                return (
                    <span className="text-muted-foreground">
                        {format(new Date(row.getValue("validationDate")), "PPP")}
                    </span>
                );
            },
        },
        {
            accessorKey: "goal",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Goal" />
            ),
            cell: ({ getValue }) => (
                <div className="truncate max-w-[300px]">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <OpenSprintButton sprint={row.original} />
                        <Protect
                            allowedRoles={[RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT]}
                        >
                            <DataTableRowActions
                                row={row}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </Protect>
                    </div>
                );
            },
        },
    ];
