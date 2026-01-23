import { Bar, BarChart, CartesianGrid, XAxis, Cell, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartAreaInteractiveProps {
  data: {
    sprints: any[];
    tasks: any[];
    risks: any[];
    kpis: any[];
    users: any[];
  };
}

const chartConfig = {
  count: {
    label: "Count",
  },
  sprints: {
    label: "Sprints",
    color: "var(--chart-1)",
  },
  tasks: {
    label: "Tasks",
    color: "var(--chart-2)",
  },
  risks: {
    label: "Risks",
    color: "var(--chart-3)",
  },
  kpis: {
    label: "KPIs",
    color: "var(--chart-4)",
  },
  users: {
    label: "Users",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const chartData = [
    { name: "Sprints", count: data.sprints.length, fill: "var(--chart-1)" },
    { name: "Tasks", count: data.tasks.length, fill: "var(--chart-2)" },
    { name: "Risks", count: data.risks.length, fill: "var(--chart-3)" },
    { name: "KPIs", count: data.kpis.length, fill: "var(--chart-4)" },
    { name: "Users", count: data.users.length, fill: "var(--chart-5)" },
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
      <CardHeader>
        <CardTitle>Resource Allocation</CardTitle>
        <CardDescription>
          Distribution of entities across the project ecosystem.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              barSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
