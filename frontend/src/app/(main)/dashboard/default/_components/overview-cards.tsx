import { cn } from "@/lib/utils";
import { RoleEnum } from "@/features/users/types/roles.types";
import { TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { TaskResponse } from "@/features/tasks/schemas/tasks.schemas";
import { UserResponse } from "@/features/users/schemas/users.schemas";
import { RiskResponse } from "@/features/risks/schemas/risks.schemas";
import { Rocket, CheckCircle2, Users, AlertTriangle } from "lucide-react";
import { SprintStatus } from "@/features/sprints/schemas/sprints.schemas";
import { SprintResponse } from "@/features/sprints/schemas/sprints.schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationResponse } from "@/features/notifications/schemas/notifications.schemas";

interface DashboardData {
  sprints: SprintResponse[];
  tasks: TaskResponse[];
  users: UserResponse[];
  risks: RiskResponse[];
  notifications: NotificationResponse[];
}

export function OverviewCards({ data }: { data: DashboardData }) {
  const activeSprintsCount = data.sprints.filter(s => s.status === SprintStatus.ACTIVE).length;
  const inProgressTasksCount = data.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
  const activeMembersCount = data.users.filter(u => u.role?.id !== RoleEnum.ALUMNI).length;
  const criticalRisksCount = data.risks.filter(r => (r.severity || 0) >= 4).length;

  const cards = [
    {
      title: "Active Sprints",
      value: activeSprintsCount,
      description: "Currently running sprints",
      icon: Rocket,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      gradient: "from-blue-500/5 to-transparent",
    },
    {
      title: "Tasks In Progress",
      value: inProgressTasksCount,
      description: "Active work items",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
    },
    {
      title: "Active Members",
      value: activeMembersCount,
      description: "Excluding alumni",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      gradient: "from-orange-500/5 to-transparent",
    },
    {
      title: "Critical Risks",
      value: criticalRisksCount,
      description: "Severity level ≥ 4",
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      gradient: "from-destructive/5 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          className={cn(
            "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group",
            card.gradient && `bg-gradient-to-br ${card.gradient}`
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={cn("rounded-full p-2 transition-colors", card.bg, "group-hover:bg-opacity-20")}>
              <card.icon className={cn("size-4", card.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
