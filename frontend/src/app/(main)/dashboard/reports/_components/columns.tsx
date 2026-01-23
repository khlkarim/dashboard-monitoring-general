import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { SprintResponse } from "@/features/sprints/schemas/sprints.schemas";
import { TaskResponse } from "@/features/tasks/schemas/tasks.schemas";
import { RiskResponse } from "@/features/risks/schemas/risks.schemas";
import { UserResponse } from "@/features/users/schemas/users.schemas";
import { KpiResponse } from "@/features/kpis/schemas/kpis.schemas";

export const sprintColumns: ColumnDef<SprintResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sprint Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.original.status.toLowerCase()}</Badge>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => row.original.startDate ? format(new Date(row.original.startDate), "MMM dd, yyyy") : "-",
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => row.original.endDate ? format(new Date(row.original.endDate), "MMM dd, yyyy") : "-",
  },
];

export const taskColumns: ColumnDef<TaskResponse>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.original.status.toLowerCase().replace("_", " ")}</Badge>,
  },
  {
    accessorKey: "criticality",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criticality" />,
    cell: ({ row }) => <Badge variant="secondary" className="capitalize">{row.original.criticality || "0"}</Badge>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => row.original.dueDate ? format(new Date(row.original.dueDate), "MMM dd, yyyy") : "-",
  },
];

export const riskColumns: ColumnDef<RiskResponse>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Risk" />,
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    accessorKey: "occurrence",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Occurrence" />,
    cell: ({ row }) => row.original.occurrence || 0,
  },
  {
    accessorKey: "severity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Severity" />,
    cell: ({ row }) => {
      const severity = row.original.severity || 0;
      return (
        <Badge variant={severity >= 4 ? "destructive" : "outline"} className="capitalize">
          {severity}
        </Badge>
      );
    },
  },
  {
    accessorKey: "detection",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Detection" />,
    cell: ({ row }) => row.original.detection || 0,
  },
];

export const userColumns: ColumnDef<UserResponse>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.firstName} {row.original.lastName}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.original.role?.name?.toLowerCase() || "Member"}</Badge>,
  },
];

export const kpiColumns: ColumnDef<KpiResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="KPI" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "samplingRate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sampling Rate" />,
    cell: ({ row }) => row.original.samplingRate || "-",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM dd, yyyy"),
  },
];
