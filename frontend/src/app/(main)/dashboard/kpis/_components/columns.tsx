"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

import { Kpi } from "@/features/kpis/types/kpis.types";
import { useRouter } from "next/navigation";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { Button } from "@/components/ui/button";

function OpenKpiButton({ kpi }: { kpi: Kpi }) {
    const router = useRouter();
    const { addSubNavItem } = useNavigationStore();

    const handleOpenKpi = () => {
        addSubNavItem(2, "KPIs", {
            title: kpi.name,
            url: `/dashboard/kpis/${kpi.id}`,
        });
        router.push(`/dashboard/kpis/${kpi.id}`);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleOpenKpi}
        >
            Open
        </Button>
    );
}

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
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
            cell: ({ getValue }) => (
                <div className="truncate max-w-[300px]">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            accessorKey: "samplingRate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sampling Rate" />
            ),
        },
        {
            accessorKey: "samplingMethod",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sampling Method" />
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <OpenKpiButton kpi={row.original} />
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
