"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMemberStatistics } from "@/features/users/hooks/use-get-member-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer, 
    Legend, 
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

interface MemberStatisticsProps {
    userId: string;
}

const STATUS_COLORS = {
    TODO: "#94a3b8",
    IN_PROGRESS: "#3b82f6",
    DONE: "#10b981",
    BLOCKED: "#ef4444",
};

const STATUS_LABELS = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
    BLOCKED: "Blocked",
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
            name: STATUS_LABELS[name as keyof typeof STATUS_LABELS] || name,
            value: value as number,
            originalName: name,
        }));

    // Prepare data for skills bar chart
    const skillsData = stats.skillsDistribution.map((skill: { skillId: string; skillTitle: string; taskCount: number }) => ({
        name: skill.skillTitle,
        tasks: skill.taskCount,
    }));

    return (
        <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
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
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, value }) => `${name}: ${value}`}
                                    >
                                        {statusData.map((entry) => (
                                            <Cell
                                                key={entry.originalName}
                                                fill={STATUS_COLORS[entry.originalName as keyof typeof STATUS_COLORS]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                No task data available
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Skills Distribution Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skills Distribution</CardTitle>
                        <CardDescription>
                            Tasks assigned by skill category
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {skillsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={skillsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="name" 
                                        angle={-45}
                                        textAnchor="end"
                                        height={100}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="tasks" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                No skills data available
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Skills Details Table */}
            {stats.skillsDistribution.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Skills Breakdown</CardTitle>
                        <CardDescription>
                            Detailed view of tasks per skill
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {stats.skillsDistribution.map((skill: { skillId: string; skillTitle: string; taskCount: number }) => (
                                <div
                                    key={skill.skillId}
                                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                >
                                    <span className="font-medium">{skill.skillTitle}</span>
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        {skill.taskCount} {skill.taskCount === 1 ? 'task' : 'tasks'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
