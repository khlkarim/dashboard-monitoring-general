import { format } from "date-fns";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface KpiStatsProps {
    kpi: Kpi;
}

export function KpiStats({ kpi }: KpiStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        setStats([
            {
                title: "Sampling Rate",
                value: kpi.samplingRate,
                description: "Frequency of data collection",
                icon: <Timer />
            },
            {
                title: "Total Samples",
                value: kpi.samples?.length || 0,
                description: "Data points recorded",
            },
            {
                title: "Created",
                value: kpi.createdAt ? format(new Date(kpi.createdAt), "MMM d, yyyy") : "--",
                description: "Creation date",
            },
        ]);
    }, [kpi]);

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