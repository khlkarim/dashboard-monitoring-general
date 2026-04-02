import { Bell, Users} from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard, StatCardProps } from "@/components/common/stat-card";
import { Notification } from "@/features/notifications/types/notifications.types";

interface NotificationStatsProps {
    notifications: Notification[];
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(notifications) {
            setStats([
                {
                    title: "Total Notifications",
                    value: notifications.length,
                    description: "All notifications",
                    icon: <Bell className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "With Recipients",
                    value: notifications.filter(n => n.recipients && n.recipients.length > 0).length.toString(),
                    description: "Targeted notifications",
                    icon: <Users className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                }
            ]);
        }
    }, [notifications]);

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