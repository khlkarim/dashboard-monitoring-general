import { Clock, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { format, isAfter, parseISO } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SprintResponse } from "@/features/sprints/schemas/sprints.schemas";
import { TaskResponse, TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { UserResponse } from "@/features/users/schemas/users.schemas";
import { RiskResponse } from "@/features/risks/schemas/risks.schemas";
import { NotificationResponse } from "@/features/notifications/schemas/notifications.schemas";

interface DashboardData {
  sprints: SprintResponse[];
  tasks: TaskResponse[];
  users: UserResponse[];
  risks: RiskResponse[];
  notifications: NotificationResponse[];
}

export function OperationalCards({ data }: { data: DashboardData }) {
  const upcomingTasks = data.tasks
    .filter(t => t.status !== TaskStatus.DONE && t.dueDate)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const notifications = data.notifications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="flex flex-col transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">Upcoming Tasks</CardTitle>
              <CardDescription>Requiring immediate attention</CardDescription>
            </div>
            <Clock className="size-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 cursor-default"
                >
                  <div className="space-y-1.5 overflow-hidden">
                    <p className="text-sm font-semibold truncate leading-none">{task.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{format(parseISO(task.dueDate), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                  <Badge
                    variant={task.status === TaskStatus.IN_PROGRESS ? "default" : "secondary"}
                    className="ml-2 shrink-0 capitalize"
                  >
                    {task.status.toLowerCase().replace("_", " ")}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                <CheckCircle className="size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">All caught up!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">Recent Alerts</CardTitle>
              <CardDescription>Latest system updates</CardDescription>
            </div>
            <AlertCircle className="size-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 cursor-default"
                >
                  <div className="mt-0.5 rounded-full bg-primary/10 p-1 group-hover:bg-primary/20 transition-colors">
                    <AlertCircle className="size-3.5 text-primary" />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{notification.description}</p>
                    <p className="text-[10px] uppercase font-medium text-muted-foreground/70 tracking-wider">
                      {format(parseISO(notification.createdAt), "MMM dd • HH:mm")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                <AlertCircle className="size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No recent alerts.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
