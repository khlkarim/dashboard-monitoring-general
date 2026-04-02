"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetGeneralStatistics } from "@/features/dashboard/hooks/use-get-general-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { GeneralStatisticsPDF } from "./general-statistics-pdf";

export function GeneralStatistics() {
  const { data: stats, isLoading, error } = useGetGeneralStatistics();

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
          <p className="text-destructive">Failed to load general statistics</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <PDFDownloadLink
          document={<GeneralStatisticsPDF stats={stats} />}
          fileName={`general-statistics-${new Date().toISOString().split("T")[0]}.pdf`}
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
            <CardDescription>Sprint Completion Rate</CardDescription>
            <CardTitle className="text-3xl">{stats.sprintCompletionRate}%</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Sprint Duration</CardDescription>
            <CardTitle className="text-3xl">{stats.averageSprintDuration} days</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tasks per Sprint</CardDescription>
            <CardTitle className="text-3xl">{stats.tasksPerSprint}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* KPIs by Processus Chart */}
        {stats.kpiCountByProcessus.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>KPIs Count by Processus</CardTitle>
              <CardDescription>Distribution of KPIs across different processus</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ kpiCount: { label: "KPI Count", color: "var(--chart-1)" } }}
                className="h-[200px] w-full"
              >
                <BarChart data={stats.kpiCountByProcessus} barSize={32}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="processusLabel"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    fontSize={10}
                    angle={-35}
                    textAnchor="end"
                    height={60}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="kpiCount" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Risk Priority Matrix */}
        {stats.riskPriorityMatrix.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Risk Priority Matrix</CardTitle>
              <CardDescription>Distribution of risks by priority level</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ count: { label: "Risk Count", color: "var(--chart-1)" } }}
                className="h-[200px] w-full"
              >
                <BarChart data={stats.riskPriorityMatrix} barSize={40}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="priority" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Unmitigated Risks */}
        <Card>
          <CardHeader>
            <CardTitle>Unmitigated Risks</CardTitle>
            <CardDescription>
              {stats.unmitigatedRisks.length} risk{stats.unmitigatedRisks.length !== 1 ? "s" : ""} without mitigation
              actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] space-y-3 overflow-y-auto">
              {stats.unmitigatedRisks.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground text-sm">No unmitigated risks</p>
                </div>
              ) : (
                stats.unmitigatedRisks.map((risk) => (
                  <div key={risk.id} className="space-y-2 rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-1 text-sm font-medium">{risk.title}</h4>
                      <Badge
                        variant={risk.priority === "critical" || risk.priority === "high" ? "destructive" : "secondary"}
                        className="shrink-0"
                      >
                        {risk.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs">{risk.description}</p>
                    <div className="text-muted-foreground flex gap-3 text-xs">
                      <span>D:{risk.detection}</span>
                      <span>O:{risk.occurrence}</span>
                      <span>S:{risk.severity}</span>
                      <span className="font-medium">Score:{risk.priorityScore}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
