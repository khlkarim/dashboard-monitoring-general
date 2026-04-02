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
                    icon: <ListChecks className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "Active Now",
                    value:  sprints.filter(s => s.status === SprintStatus.ACTIVE).length.toString(),
                    description: "Currently in progress",
                    icon: <Activity className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "Planned",
                    value:  sprints.filter(s => s.status === SprintStatus.PLANNED).length.toString(),
                    description: "Upcoming sprints",
                    icon: <Clock className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                },
                {
                    title: "Completed",
                    value:  sprints.filter(s => s.status === SprintStatus.COMPLETED).length.toString(),
                    description: "Successfully finished",
                    icon: <CheckCircle2 className="text-destructive" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-destructive/10 bg-gradient-to-br from-destructive/5 to-transparent"
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
                        icon={stat.icon}
                        title={stat.title}          
                        value={stat.value}
                        className={stat.className} 
                        description={stat.description}    
                    />
                );
            })}
        </div>
    );
}