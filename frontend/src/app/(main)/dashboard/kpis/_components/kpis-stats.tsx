import { useEffect, useState } from "react";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { BarChart3, Database, FileSpreadsheet } from "lucide-react";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface KpisStatsProps {
    kpis: Kpi[];
}

export function KpisStats({ kpis }: KpisStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(kpis) {
            setStats([
                {
                    title: "Total Kpis",
                    value: kpis.length.toString(),
                    description: "Defined metrics",
                    icon: <BarChart3 className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "With Data",
                    value: kpis.filter((k) => k.samples && k.samples.length > 0).length.toString(),
                    description: "KPIs collecting samples",
                    icon: <Database className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "Defined Rates",
                    value: kpis.filter((k) => k.samplingRate).length.toString(),
                    description: "Sampling rates configured",
                    icon: <FileSpreadsheet className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                },
            ]);
        }
    }, [kpis]);

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