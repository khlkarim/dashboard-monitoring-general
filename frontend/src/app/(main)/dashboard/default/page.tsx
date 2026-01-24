"use client";

import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { InsightCards } from "./_components/insight-cards";
import { OperationalCards } from "./_components/operational-cards";
import { OverviewCards } from "./_components/overview-cards";
import { TableCards } from "./_components/table-cards";
import { Separator } from "@/components/ui/separator";

function Page() {
  const { user } = useAuthStore();
  const { data: sprints } = useGetSprints();
  const { data: tasks } = useGetTasks();
  const { data: users } = useGetUsers();
  const { data: risks } = useGetRisks();
  const { data: notifications } = useGetNotifications(user?.id || "");

  const dashboardData = {
    sprints: sprints?.data || [],
    tasks: tasks?.data || [],
    users: users?.data || [],
    risks: risks?.data || [],
    notifications: notifications?.data || [],
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground text-lg">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      <Separator />

      <OverviewCards data={dashboardData} />
      <InsightCards data={dashboardData} />
      <OperationalCards data={dashboardData} />
      {/* <TableCards data={dashboardData} /> */}
    </div>
  );
}

export default withAuth(Page);