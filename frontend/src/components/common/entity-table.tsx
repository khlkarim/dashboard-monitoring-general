"use client";
"use no memo";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { ColumnDef } from "@tanstack/react-table";
import { ErrorDisplay } from "./error-display";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EntityTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    title: string;
    description: string;
    isLoading?: boolean;
    isError?: boolean;
    error?: unknown;
    getRowId?: (row: TData) => string;
    onCreate?: () => void;
    entityName?: string;
    searchColumn?: string;
    filters?: {
        columnId: string;
        title: string;
        options: {
            label: string;
            value: string;
            icon?: React.ComponentType<{ className?: string }>;
        }[];
    }[];
}

export function EntityTable<TData, TValue>({
    data,
    columns,
    title,
    description,
    isLoading,
    isError,
    error,
    getRowId,
    onCreate,
    entityName = "Entity",
    searchColumn,
    filters
}: EntityTableProps<TData, TValue>) {
    const table = useDataTableInstance({
        data,
        columns,
        getRowId: getRowId ?? ((row) => (row as any).id.toString()),
    });

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Loading...</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    Loading data...
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return <ErrorDisplay error={error} title={`Failed to load ${title}`} />;
    }

    return (
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {onCreate && (
                                <Button onClick={onCreate} size="sm">
                                    <Plus className="h-4 w-4" />
                                    Create {entityName}
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex size-full flex-col gap-4">
                    <DataTableToolbar table={table} searchColumn={searchColumn} filters={filters} />
                    <div className="overflow-hidden rounded-md border">
                        <DataTable table={table} columns={columns} />
                    </div>
                    <DataTablePagination table={table} />
                </CardContent>
            </Card>
        </div>
    );
}
