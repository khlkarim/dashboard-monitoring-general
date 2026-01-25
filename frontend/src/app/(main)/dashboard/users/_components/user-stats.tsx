import { format } from "date-fns";
import { useEffect, useState } from "react";
import { User } from "@/features/users/types/users.types";
import { Calendar, Shield, UserIcon } from "lucide-react";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface UserStatsProps {
    user: User;
}

export function UserStats({ user }: UserStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(user) {
            setStats([
                {
                    title: "Role",
                    value: user.role?.name || "--",
                    description: "System Access Level",
                    icon: <Shield className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "Account Status",
                    value: user.status?.name || "--",
                    description: "Current Account State",
                    icon: <UserIcon className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "Joined On",
                    value: user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "--",
                    description: "Registration Date",
                    icon: <Calendar className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                }
            ]);
        }
    }, [user]);

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