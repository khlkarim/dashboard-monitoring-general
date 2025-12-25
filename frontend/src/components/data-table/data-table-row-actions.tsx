"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit?: (original: TData) => void;
    onDelete?: (original: TData) => void;
    idAccessor?: keyof TData;
}

export function DataTableRowActions<TData>({
    row,
    onEdit,
    onDelete,
    idAccessor = "id" as keyof TData,
}: DataTableRowActionsProps<TData>) {
    const original = row.original;
    // Safely access ID if it exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = (original as any)[idAccessor];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {id && (
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(String(id))}
                    >
                        <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Copy ID
                    </DropdownMenuItem>
                )}
                {(onEdit || onDelete) && <DropdownMenuSeparator />}
                {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(original)}>
                        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Edit
                    </DropdownMenuItem>
                )}
                {onDelete && (
                    <DropdownMenuItem
                        onClick={() => onDelete(original)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
