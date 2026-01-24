import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/features/tasks/types/tasks.types";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { TaskStatus } from "@/features/tasks/schemas/tasks.schemas";
import { StatCard, StatCardProps } from "@/components/common/stat-card";
import { SprintStatus } from "@/features/sprints/schemas/sprints.schemas";

interface SprintStatsProps {
    sprint: Sprint;
    tasks: Task[];
}

export function SprintStats({ sprint, tasks }: SprintStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === TaskStatus.DONE).length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
        const now = new Date();
        const endDate = new Date(sprint.endDate);
        const startDate = new Date(sprint.startDate);
        const daysRemaining = differenceInDays(endDate, now);
        const totalDuration = differenceInDays(endDate, startDate);
    
        let timeStatus = "Upcoming";
        if (sprint.status === SprintStatus.COMPLETED) timeStatus = "Ended";
        if (sprint.status === SprintStatus.ACTIVE) timeStatus = "In Progress";

        setStats([
            {
                title: "Timeline",
                value: (
                    <>
                        <div className="text-2xl font-bold">{timeStatus}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                        </p>
                    </>
                ),
                description: (
                    <>
                        {timeStatus === 'In Progress' && (
                            <div className="mt-3">
                                <span className="text-xs font-medium">{daysRemaining} days remaining</span>
                                <Progress value={((totalDuration - daysRemaining) / totalDuration) * 100} className="h-1 mt-1" />
                            </div>
                        )}
                    </>
                ),
                icon: <Calendar />
            },
            {
                title: "Sprint Progress",
                value: (
                    <>
                        <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>
                    </>
                ),
                description: (
                    <>
                        <Progress value={progress} className="h-2 mt-3" />
                    </>
                ),
            }
        ]);
    }, [sprint, tasks]);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
                return (
                    <StatCard 
                        key={i}
                        title={stat.title}          
                        value={stat.value}
                        description={stat.description}     
                    />
                );
            })}
        </div>
    );
}