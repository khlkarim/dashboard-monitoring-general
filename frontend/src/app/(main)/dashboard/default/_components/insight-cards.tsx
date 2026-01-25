import { PieChart as PieChartIcon, ShieldAlert, Users } from "lucide-react";
import { XAxis, Label, Pie, PieChart, Bar, BarChart, CartesianGrid } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";

import { TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
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

export function InsightCards({ data }: { data: DashboardData }) {
  // Task Distribution Data
  const taskDistribution = [
    { name: "Todo", value: data.tasks.filter(t => t.status === TaskStatus.TODO).length, fill: "var(--chart-1)" },
    { name: "In Progress", value: data.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length, fill: "var(--chart-2)" },
    { name: "Done", value: data.tasks.filter(t => t.status === TaskStatus.DONE).length, fill: "var(--chart-3)" },
  ];

  const totalTasks = data.tasks.length;

  // Risk Severity Distribution
  const riskSeverityData = [1, 2, 3, 4, 5].map(level => ({
    level: `Level ${level}`,
    count: data.risks.filter(r => (r.severity || 0) === level).length,
  }));

  // User Role Distribution
  const roleDistribution = data.users.reduce((acc: any[], user) => {
    const roleId = user.role?.id || "unknown";
    const existing = acc.find(r => r.roleId === roleId);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        roleId,
        role: roleId.charAt(0).toUpperCase() + roleId.slice(1).toLowerCase(),
        count: 1,
      });
    }
    return acc;
  }, []).map((item, index) => ({
    ...item,
    fill: `var(--chart-${(index % 5) + 1})`,
  }));

  const taskConfig = {
    Todo: { label: "Todo", color: "var(--chart-1)" },
    "In Progress": { label: "In Progress", color: "var(--chart-2)" },
    Done: { label: "Done", color: "var(--chart-3)" },
  };

  const riskConfig = {
    count: { label: "Risks", color: "var(--chart-1)" },
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/* Task Distribution */}
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="items-center pb-2">
          <div className="flex items-center gap-2">
            <PieChartIcon className="size-4 text-blue-500" />
            <CardTitle>Task Distribution</CardTitle>
          </div>
          <CardDescription>Overall status breakdown</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <ChartContainer config={taskConfig} className="mx-auto aspect-square max-h-[220px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={taskDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTasks}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Tasks
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Risk Severity */}
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-destructive" />
            <CardTitle>Risk Severity</CardTitle>
          </div>
          <CardDescription>Risks by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={riskConfig} className="min-h-[200px] w-full">
            <BarChart data={riskSeverityData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="level"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Team Composition */}
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="items-center pb-2">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-orange-500" />
            <CardTitle>Team Composition</CardTitle>
          </div>
          <CardDescription>User role distribution</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <ChartContainer config={{}} className="mx-auto aspect-square max-h-[220px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={roleDistribution}
                dataKey="count"
                nameKey="role"
                innerRadius={60}
                strokeWidth={5}
              />
              <ChartLegend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
