"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

import { Kpi } from "@/features/kpis/types/kpis.types";

export const getColumns = (
    onEdit: (kpi: Kpi) => void,
    onDelete: (kpi: Kpi) => void
): ColumnDef<Kpi>[] => [
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
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            accessorKey: "targetValue",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Target Value" />
            ),
            cell: ({ row }) => {
                const value = row.getValue("targetValue") as number | null;
                return <div className="font-medium">{value ?? "-"}</div>;
            },
        },
        {
            accessorKey: "actualValue",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actual Value" />
            ),
            cell: ({ row }) => {
                const value = row.getValue("actualValue") as number | null;
                return <div className="font-medium">{value ?? "-"}</div>;
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <DataTableRowActions
                        row={row}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            },
        },
    ];
