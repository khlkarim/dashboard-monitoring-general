"use client";
"use no memo";

import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "../data-table/data-table-faceted-filter";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "../data-table/data-table-view-options";

interface TextSearchConfig {
    columnId: string;
    placeholder?: string;
    className?: string;
}

interface FacetedFilterConfig {
    title: string;
    columnId: string;
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }> // weird
    }[]
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>;

    search?: TextSearchConfig;
    filters?: FacetedFilterConfig[];

    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;

    showReset?: boolean;
    showViewOptions?: boolean;
}

export function TextSearch<TData>({
    table,
    columnId,
    placeholder = "Filter…",
    className,
}: {
    table: Table<TData>
    columnId: string
    placeholder?: string
    className?: string
}) {
    const column = table.getColumn(columnId)
    if (!column) return null

    return (
        <Input
            placeholder={placeholder}
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className={`h-8 ${className} w-[150px] lg:w-[250px]`}
        />
    )
}


export function DataTableToolbar<TData>({
    table,
    search,
    filters,
    leftSlot,
    rightSlot,
    showViewOptions = true,
    showReset = true,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
                {search && (
                    <TextSearch
                        table={table}
                        columnId={search.columnId}
                        placeholder={search.placeholder}
                        className={search.className}
                    />
                )}

                {filters?.map(
                    (filter) =>
                        table.getColumn(filter.columnId) && (
                            <DataTableFacetedFilter
                                key={filter.columnId}
                                column={table.getColumn(filter.columnId)}
                                title={filter.title}
                                options={filter.options}
                            />
                        )
                )}

                {showReset && isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}

                {leftSlot}
            </div>

            <div className="flex items-center gap-2">
                {rightSlot}
                {showViewOptions && <DataTableViewOptions table={table} />}
            </div>
        </div>
    );
}
