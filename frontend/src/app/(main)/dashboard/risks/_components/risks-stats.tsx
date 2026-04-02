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
                    icon: <Activity className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "Critical Risks",
                    value: risks.filter(r => calculateRPN(r) >= 200).length.toString(),
                    description: <>RPN &ge; 200</>,
                    icon: <AlertOctagon className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "High Priority",
                    value: risks.filter(r => {
                        const rpn = calculateRPN(r);
                        return rpn >= 100 && rpn < 200;
                    }).length.toString() ?? "",
                    description: "RPN 100 - 199",
                    icon: <AlertTriangle className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                },
                {
                    title: "Manageable",
                    value: risks.filter(r => calculateRPN(r) < 100).length.toString(),
                    description: <>RPN &lt; 100</>,
                    icon: <ShieldCheck className="text-destructive" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-destructive/10 bg-gradient-to-br from-destructive/5 to-transparent"
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