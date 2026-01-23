import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { NotificationResponse } from "@/features/notifications/schemas/notifications.schemas";

export const notificationColumns: ColumnDef<NotificationResponse>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        cell: ({ row }) => <span className="text-muted-foreground line-clamp-1">{row.original.description}</span>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sent At" />,
        cell: ({ row }) => (
            <span className="text-muted-foreground tabular-nums">
                {format(parseISO(row.original.createdAt), "MMM dd, yyyy HH:mm")}
            </span>
        ),
    },
];
