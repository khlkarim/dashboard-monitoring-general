import { useEffect, useState } from "react";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";
import { Activity, Clock, CheckCircle2, ListChecks } from "lucide-react";
import { SprintStatus } from "@/features/sprints/schemas/sprints.schemas";

interface SprintsStatsProps {
    sprints: Sprint[];
}

export function SprintsStats({ sprints }: SprintsStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(sprints) {   
            setStats([
                {
                    title: "Total Sprints",
                    value: sprints.length.toString(),
                    description: "All time sprints",
                    icon: <ListChecks />
                },
                {
                    title: "Active Now",
                    value:  sprints.filter(s => s.status === SprintStatus.ACTIVE).length.toString(),
                    description: "Currently in progress",
                    icon: <Activity />
                },
                {
                    title: "Planned",
                    value:  sprints.filter(s => s.status === SprintStatus.PLANNED).length.toString(),
                    description: "Upcoming sprints",
                    icon: <Clock />
                },
                {
                    title: "Completed",
                    value:  sprints.filter(s => s.status === SprintStatus.COMPLETED).length.toString(),
                    description: "Successfully finished",
                    icon: <CheckCircle2 />
                },
            ]);
        }
    }, [sprints]);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
                return (
                    <StatCard 
                        key={i}
                        title={stat.title}          
                        value={stat.value}
                        description={stat.description}     
                        icon={stat.icon}
                    />
                );
            })}
        </div>
    );
}