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
                    icon: <Bell />
                },
                {
                    title: "With Recipients",
                    value: notifications.filter(n => n.recipients && n.recipients.length > 0).length.toString(),
                    description: "Targeted notifications",
                    icon: <Users />
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
                        title={stat.title}          
                        value={stat.value}
                        description={stat.description}     
                    />
                );
            })}
        </div>
    );
}