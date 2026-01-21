"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Risk } from "@/features/risks/types/risks.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

// Separate component to properly use hooks
function OpenRiskButton({ risk }: { risk: Risk }) {
    const router = useRouter();
    const { addSubNavItem } = useNavigationStore();

    const handleOpenRisk = () => {
        // Add risk as subitem to "Risks" in the navigation
        // Note: You might need to ensure "Risks" parent item exists in sidebar configuration
        addSubNavItem(2, "Risks", {
            title: risk.title || "Untitled Risk",
            url: `/dashboard/risks/${risk.id}`,
        });

        // Navigate to risk detail page
        router.push(`/dashboard/risks/${risk.id}`);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleOpenRisk}
        >
            Open
        </Button>
    );
}

export const getColumns = (
    onEdit: (risk: Risk) => void,
    onDelete: (risk: Risk) => void
): ColumnDef<Risk>[] => [
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
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
        },
        {
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            accessorKey: "criticity",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Criticity" />
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <OpenRiskButton risk={row.original} />
                        <DataTableRowActions
                            row={row}
                            onEdit={() => onEdit(row.original)}
                            onDelete={() => onDelete(row.original)}
                        />
                    </div>
                );
            },
        },
    ];
