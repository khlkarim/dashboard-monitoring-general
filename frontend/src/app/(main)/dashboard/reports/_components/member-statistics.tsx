"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMemberStatistics } from "@/features/users/hooks/use-get-member-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Label } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";

interface MemberStatisticsProps {
    userId: string;
}

const taskStatusConfig = {
    TODO: { label: "To Do", color: "var(--chart-1)" },
    IN_PROGRESS: { label: "In Progress", color: "var(--chart-2)" },
    DONE: { label: "Done", color: "var(--chart-3)" },
    BLOCKED: { label: "Blocked", color: "var(--chart-4)" },
};

export function MemberStatistics({ userId }: MemberStatisticsProps) {
    const { data: stats, isLoading, error } = useGetMemberStatistics(userId);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(6)].map((_, i) => (
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
                    <p className="text-destructive">Failed to load member statistics</p>
                </CardContent>
            </Card>
        );
    }

    if (!stats) return null;

    // Prepare data for pie chart
    const statusData = Object.entries(stats.taskStatusDistribution)
        .filter(([_, value]) => (value as number) > 0)
        .map(([name, value]) => ({
            name: taskStatusConfig[name as keyof typeof taskStatusConfig]?.label || name,
            value: value as number,
            fill: taskStatusConfig[name as keyof typeof taskStatusConfig]?.color || "var(--chart-5)",
        }));

    const totalTasks = stats.totalTasks;

    return (
        <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Tasks</CardDescription>
                        <CardTitle className="text-3xl">{stats.totalTasks}</CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Overdue Tasks</CardDescription>
                        <CardTitle className="text-3xl text-destructive">
                            {stats.overdueTasks}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Completion Rate</CardDescription>
                        <CardTitle className="text-3xl">
                            {stats.completionRate.toFixed(1)}%
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Engagement Score</CardDescription>
                        <CardTitle className="text-3xl">
                            {stats.engagementScore.toFixed(1)}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>On-Time Rate</CardDescription>
                        <CardTitle className="text-3xl">
                            {stats.onTimeRate.toFixed(1)}%
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Avg Completion</CardDescription>
                        <CardTitle className="text-3xl">
                            {stats.averageCompletionTime.toFixed(1)}
                            <span className="text-sm font-normal ml-1">days</span>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Task Status Distribution Pie Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Task Status Distribution</CardTitle>
                    <CardDescription>
                        Breakdown of tasks by their current status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {statusData.length > 0 ? (
                        <ChartContainer config={taskStatusConfig} className="mx-auto aspect-square max-h-[300px]">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={statusData}
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
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                                <ChartLegend />
                            </PieChart>
                        </ChartContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                            No task data available
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
