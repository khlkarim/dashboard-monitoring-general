"use client";

import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import { Separator } from "@/components/ui/separator";

function Page() {
  const { user } = useAuthStore();
  const { data: sprints } = useGetSprints();
  const { data: tasks } = useGetTasks({});
  const { data: users } = useGetUsers();
  const { data: risks } = useGetRisks();
  const { data: kpis } = useGetKpis({});
  const { data: notifications } = useGetNotifications(user?.id || "");

  const dashboardData = {
    sprints: sprints?.data || [],
    tasks: tasks?.data || [],
    users: users?.data || [],
    risks: risks?.data || [],
    kpis: kpis?.data || [],
    notifications: notifications?.data || [],
  };

  return (
    <div className="@container/main flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground text-lg">
          Detailed analytical overview and data export.
        </p>
      </div>

      <Separator />

      <SectionCards data={dashboardData} />
      <ChartAreaInteractive data={dashboardData} />
      <DataTable
        fullData={dashboardData}
      />
    </div>
  );
}

export default withAuth(Page);
