"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { sprintsApi } from "@/features/sprints/api/sprints.api";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ArrowLeft, Calendar, CheckCircle2, ChevronRight, Clock, Target } from "lucide-react";
import KanbanBoardComponent from "../_components/kanban-board";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { differenceInDays, format, isFuture, isPast } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

function SprintDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();
    const [sprint, setSprint] = useState<Sprint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sprintId = params.sprintId as string;
    const { data: tasksData, isLoading: tasksLoading } = useGetTasks({ sprintId });

    useEffect(() => {
        const fetchSprint = async () => {
            try {
                setLoading(true);
                const data = await sprintsApi.findOne(sprintId);
                setSprint(data);
            } catch (err) {
                setError("Failed to load sprint details");
                console.error("Error fetching sprint:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSprint();
    }, [sprintId]);

    const handleClose = () => {
        if (sprint) {
            // Remove sprint from navigation sidebar
            removeSubNavItem(2, "Sprints", sprint.name);
        }
        // Navigate back to sprints page
        router.push("/dashboard/sprints");
    };

    if (loading || tasksLoading) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                </div>
                <Skeleton className="h-[500px] w-full" />
            </div>
        );
    }

    if (error || !sprint) {
        return (
            <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-[50vh]">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>{error || "Sprint not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="secondary" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Sprints
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Metrics Calculation
    const totalTasks = tasksData?.data.length || 0;
    const completedTasks = tasksData?.data.filter(t => t.status === TaskStatus.DONE).length || 0;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();
    const daysRemaining = differenceInDays(endDate, now);
    const totalDuration = differenceInDays(endDate, startDate);

    let timeStatus = "Upcoming";
    if (isPast(startDate) && isFuture(endDate)) timeStatus = "In Progress";
    if (isPast(endDate)) timeStatus = "Ended";

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard/sprints')}>Sprints</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium truncate max-w-[200px]">{sprint.name}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{sprint.name}</h1>
                            <Badge variant={sprint.status === 'ACTIVE' ? 'default' : 'secondary'}>{sprint.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-lg">{sprint.goal || "No goal defined."}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{timeStatus}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                        </p>
                        {timeStatus === 'In Progress' && (
                            <div className="mt-3">
                                <span className="text-xs font-medium">{daysRemaining} days remaining</span>
                                <Progress value={((totalDuration - daysRemaining) / totalDuration) * 100} className="h-1 mt-1" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>
                        <Progress value={progress} className="h-2 mt-3" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Velocity</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Story points per day
                        </p>
                        <div className="text-xs text-muted-foreground mt-3 italic">
                            Velocity metrics coming soon
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Kanban Board */}
            <div className="flex flex-col gap-4">
                <KanbanBoardComponent tasks={tasksData?.data || []} sprintId={sprintId} />
            </div>
        </div>
    );
}

export default withAuth(SprintDetailPage);
