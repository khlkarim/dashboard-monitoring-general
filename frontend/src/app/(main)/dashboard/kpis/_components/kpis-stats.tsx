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
                    icon: <BarChart3 />
                },
                {
                    title: "With Data",
                    value: kpis.filter((k) => k.samples && k.samples.length > 0).length.toString(),
                    description: "KPIs collecting samples",
                    icon: <Database />
                },
                {
                    title: "Defined Rates",
                    value: kpis.filter((k) => k.samplingRate).length.toString(),
                    description: "Sampling rates configured",
                    icon: <FileSpreadsheet />
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