import { calculateRPN } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Risk } from "@/features/risks/types/risks.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";
import { Activity, AlertOctagon, AlertTriangle, ShieldCheck } from "lucide-react";

interface RisksStatsProps {
    risks: Risk[];
}

export function RisksStats({ risks }: RisksStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(risks) {
            setStats([
                {
                    title: "Total Risks",
                    value: risks.length.toString(),
                    description: "Identified risks",
                    icon: <Activity />
                },
                {
                    title: "Critical Risks",
                    value: risks.filter(r => calculateRPN(r) >= 200).length.toString(),
                    description: <>RPN &ge; 200</>,
                    icon: <AlertOctagon />
                },
                {
                    title: "High Priority",
                    value: risks.filter(r => {
                        const rpn = calculateRPN(r);
                        return rpn >= 100 && rpn < 200;
                    }).length.toString() ?? "",
                    description: "RPN 100 - 199",
                    icon: <AlertTriangle />
                },
                {
                    title: "Manageable",
                    value: risks.filter(r => calculateRPN(r) < 100).length.toString(),
                    description: <>RPN &lt; 100</>,
                    icon: <ShieldCheck />
                }
            ]);
        }
    }, [risks]);

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