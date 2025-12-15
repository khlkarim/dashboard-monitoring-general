"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { kpisApi } from "@/features/kpis/api/kpis.api";

export function KpisTable() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["kpis"],
        queryFn: () => kpisApi.findAll(),
    });

    const table = useDataTableInstance({
        data: data?.data ?? [],
        columns: columns,
        getRowId: (row) => row.id.toString(),
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading KPIs...</div>;
    }

    if (isError) {
        console.error(error);
        return <div className="p-8 text-center text-destructive">Failed to load KPIs.</div>;
    }


    return (
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
            <Card>
                <CardHeader>
                    <CardTitle>KPIs</CardTitle>
                    <CardDescription>Track and manage all the KPIs.</CardDescription>
                    <CardAction>
                        <div className="flex items-center gap-2">
                            <DataTableViewOptions table={table} />
                            <Button variant="outline" size="sm">
                                <Download />
                                <span className="hidden lg:inline">Export</span>
                            </Button>
                        </div>
                    </CardAction>
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
