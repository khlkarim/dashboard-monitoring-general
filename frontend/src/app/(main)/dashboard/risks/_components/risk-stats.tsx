import { calculateRPN } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Risk } from "@/features/risks/types/risks.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface RiskStatsProps {
    risk: Risk;
}

export function RiskStats({ risk }: RiskStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        setStats([
            {
                title: "Risk Priority Number",
                value: calculateRPN(risk),
                description: "Calculated (S x O x D)",
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
            }
        ]);
    }, [risk]);

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