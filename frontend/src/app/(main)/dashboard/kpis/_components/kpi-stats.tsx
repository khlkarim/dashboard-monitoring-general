import { format } from "date-fns";
import { CalendarPlus, Database, Timer } from "lucide-react";
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
                icon: <Timer className="text-blue-500" />,
                className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
            },
            {
                title: "Total Samples",
                value: kpi.samples?.length || 0,
                description: "Data points recorded",
                icon: <Database className="text-emerald-500" />,
                className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
            },
            {
                title: "Created",
                value: kpi.createdAt ? format(new Date(kpi.createdAt), "MMM d, yyyy") : "--",
                description: "Creation date",
                icon: <CalendarPlus className="text-orange-500" />,
                className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
            },
            {
                title: "Sampling Method",
                value: kpi.samplingMethod,
                description: "Method of data collection",
                icon: <Timer className="text-blue-500" />,
                className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
            },
        ]);
    }, [kpi]);

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