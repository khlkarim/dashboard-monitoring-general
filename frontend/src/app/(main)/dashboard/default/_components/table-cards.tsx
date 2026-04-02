import { DataTable } from "@/components/data-table/data-table";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";

import { notificationColumns } from "./columns.notifications";
import { TaskResponse } from "@/features/tasks/schemas/tasks.schemas";
import { UserResponse } from "@/features/users/schemas/users.schemas";
import { RiskResponse } from "@/features/risks/schemas/risks.schemas";
import { SprintResponse } from "@/features/sprints/schemas/sprints.schemas";
import { NotificationResponse } from "@/features/notifications/schemas/notifications.schemas";

interface DashboardData {
  sprints: SprintResponse[];
  tasks: TaskResponse[];
  users: UserResponse[];
  risks: RiskResponse[];
  notifications: NotificationResponse[];
}

export function TableCards({ data }: { data: DashboardData }) {
  const table = useDataTableInstance({
    data: data.notifications,
    columns: notificationColumns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-t-4 border-t-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                System Notifications
              </CardTitle>
              <CardDescription>
                View and manage all system alerts and updates.
              </CardDescription>
            </div>
            <CardAction>
              <div className="flex items-center gap-2">
                <DataTableViewOptions table={table} />
              </div>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-xl border bg-muted/20 backdrop-blur-sm">
            <DataTable table={table} columns={notificationColumns} />
          </div>
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
