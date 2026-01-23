"use client";

import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";

function Page() {
  const { user } = useAuthStore();
  const { data: sprints } = useGetSprints();
  const { data: tasks } = useGetTasks({});
  const { data: users } = useGetUsers();
  const { data: risks } = useGetRisks();
  const { data: kpis } = useGetKpis({});

  const dashboardData = {
    sprints: sprints?.data || [],
    tasks: tasks?.data || [],
    users: users?.data || [],
    risks: risks?.data || [],
    kpis: kpis?.data || [],
  };

  // For the data table, we'll create a summary of entities
  const reportSummary = [
    { id: 1, header: "Sprints", type: "Entity", status: "Done", target: dashboardData.sprints.length.toString(), limit: "-", reviewer: "System" },
    { id: 2, header: "Tasks", type: "Entity", status: "Done", target: dashboardData.tasks.length.toString(), limit: "-", reviewer: "System" },
    { id: 3, header: "Risks", type: "Entity", status: "Done", target: dashboardData.risks.length.toString(), limit: "-", reviewer: "System" },
    { id: 4, header: "Users", type: "Entity", status: "Done", target: dashboardData.users.length.toString(), limit: "-", reviewer: "System" },
    { id: 5, header: "KPIs", type: "Entity", status: "Done", target: dashboardData.kpis.length.toString(), limit: "-", reviewer: "System" },
  ];

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6 p-6">
      <SectionCards data={dashboardData} />
      <ChartAreaInteractive data={dashboardData} />
      <DataTable
        data={reportSummary}
        fullData={dashboardData}
      />
    </div>
  );
}

export default withAuth(Page);
