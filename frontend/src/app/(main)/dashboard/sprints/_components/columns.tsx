"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

import { Sprint } from "@/features/sprints/types/sprints.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";

export const sprintStatusMap: Record<number, string> = {
    0: "Planned",
    1: "Active",
    2: "Completed",
    3: "Closed",
};

// Separate component to properly use hooks
function OpenSprintButton({ sprint }: { sprint: Sprint }) {
    const router = useRouter();
    const { addSubNavItem } = useNavigationStore();

    const handleOpenSprint = () => {
        // Add sprint as subitem to "Sprints" in the navigation
        addSubNavItem(2, "Sprints", {
            title: sprint.name,
            url: `/dashboard/sprints/${sprint.id}`,
        });

        // Navigate to sprint detail page
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
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as number;
                return <Badge variant="outline">{sprintStatusMap[status] || status}</Badge>;
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
            accessorKey: "goal",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Goal" />
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <OpenSprintButton sprint={row.original} />
                        <DataTableRowActions
                            row={row}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                );
            },
        },
    ];
