import { calculateRPN } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Risk } from "@/features/risks/types/risks.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";
import { Bug, CircleAlert, Database, Hash } from "lucide-react";

interface RiskStatsProps {
    risk: Risk;
}

export function RiskStats({ risk }: RiskStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(risk) {
            setStats([
                {
                    title: "Risk Priority Number",
                    value: calculateRPN(risk),
                    description: "Calculated (S x O x D)",
                    icon: <Database className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "Severity",
                    value: risk.severity,
                    description: (
                        <>
                            <Progress value={(risk.severity || 0) * 10} className="h-2" />                
                            <p className="text-xs text-muted-foreground mt-2">Impact of the failure</p>
                        </>
                    ),
                    icon: <CircleAlert className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "Occurrence",
                    value: risk.occurrence,
                    description: (
                        <>
                            <Progress value={(risk.occurrence || 0) * 10} className="h-2" />                
                            <p className="text-xs text-muted-foreground mt-2">Likelihood of cause</p>
                        </>
                    ),
                    icon: <Hash className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                },
                {
                    title: "Detection",
                    value: risk.detection,
                    description: (
                        <>
                            <Progress value={(risk.detection || 0) * 10} className="h-2" />                
                            <p className="text-xs text-muted-foreground mt-2">Ability to detect</p>
                        </>
                    ),
                    icon: <Bug className="text-destructive" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-destructive/10 bg-gradient-to-br from-destructive/5 to-transparent"
                }
            ]);
        }
    }, [risk]);

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