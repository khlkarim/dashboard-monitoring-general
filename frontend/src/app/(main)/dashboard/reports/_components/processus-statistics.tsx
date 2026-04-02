"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProcessusStatistics } from "@/features/processus/hooks/use-get-processus-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { KpiChart } from "../../kpis/_components/kpi-chart";
import { Processus } from "@/features/processus/types/processus.types";
import { ProcessusStatisticsPDF } from "./processus-statistics-pdf";

interface ProcessusStatisticsProps {
  processusId: string;
  processus?: Processus;
}

const criticalityConfig = {
  critical1: { label: "Lowest", color: "hsl(142.1 76.2% 36.3%)" }, // Green
  critical2: { label: "Low", color: "hsl(221.2 83.2% 53.3%)" }, // Blue
  critical3: { label: "Medium", color: "hsl(37.7 92.1% 50.2%)" }, // Amber
  critical4: { label: "High", color: "hsl(24.6 95% 53.1%)" }, // Orange
  critical5: { label: "Highest", color: "hsl(0 84.2% 60.2%)" }, // Red
  noCriticality: { label: "No Criticality", color: "hsl(var(--muted-foreground) / 0.5)" }, // Gray
};

export function ProcessusStatistics({ processusId, processus }: ProcessusStatisticsProps) {
  const { data: stats, isLoading, error } = useGetProcessusStatistics(processusId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Failed to load processus statistics</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  // Prepare data for pie chart
  const criticalityData = Object.entries(stats.taskCriticalityDistribution)
    .filter(([_, value]) => (value as number) > 0)
    .map(([name, value]) => {
      const key = name as keyof typeof criticalityConfig;
      const config = criticalityConfig[key];

      return {
        name: config?.label || name,
        value: value as number,
        fill: config?.color || "var(--chart-5)",
      };
    });

  const totalTasks = Object.values(stats.taskCriticalityDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <PDFDownloadLink
          document={<ProcessusStatisticsPDF stats={stats} processusId={processusId} processus={processus} />}
          fileName={`processus-statistics-${processusId}-${new Date().toISOString().split("T")[0]}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading} variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              {loading ? "Generating PDF..." : "Export PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total KPIs</CardDescription>
            <CardTitle className="text-3xl">{stats.totalKpis}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Activities</CardDescription>
            <CardTitle className="text-3xl">{stats.totalActivities}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tasks</CardDescription>
            <CardTitle className="text-3xl">{totalTasks}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* KPI Graphs */}
      {stats.kpisWithGraphs.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">KPI Graphs</h3>
          {stats.kpisWithGraphs.map((kpi) => (
            <Card key={kpi.id}>
              <CardHeader>
                <CardTitle>{kpi.name}</CardTitle>
                {kpi.description && <CardDescription>{kpi.description}</CardDescription>}
                {kpi.samplingRate && (
                  <CardDescription className="text-xs">Sampling Rate: {kpi.samplingRate}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {kpi.samples && kpi.samples.length > 0 ? (
                  <KpiChart samples={kpi.samples.map(String)} kpiName={kpi.name} />
                ) : (
                  <p className="text-muted-foreground text-sm">No data available</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Task Criticality Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Load by Criticality</CardTitle>
          <CardDescription>Distribution of tasks grouped by their criticality level</CardDescription>
        </CardHeader>
        <CardContent>
          {criticalityData.length > 0 ? (
            <ChartContainer config={criticalityConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={criticalityData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              {totalTasks}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              Total Tasks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <p className="text-muted-foreground text-center">No tasks available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
