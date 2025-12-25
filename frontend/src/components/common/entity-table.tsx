"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
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
    entityName = "Entity"
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
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create {entityName}
                                </Button>
                            )}
                            <DataTableViewOptions table={table} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex size-full flex-col gap-4">
                    <div className="overflow-hidden rounded-md border">
                        <DataTable table={table} columns={columns} />
                    </div>
                    <DataTablePagination table={table} />
                </CardContent>
            </Card>
        </div>
    );
}
