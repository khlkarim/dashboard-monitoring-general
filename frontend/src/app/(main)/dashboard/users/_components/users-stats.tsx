import { Users } from "lucide-react";
import { RoleEnum } from "@/features/auth";
import { useEffect, useState } from "react";
import { User } from "@/features/users/types/users.types";
import { StatusEnum } from "@/features/users/types/status.types";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface UsersStatsProps {
    users: User[];
}

export function UsersStats({ users } : UsersStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(users) {
            console.log(users);
            setStats([
                {
                    title: "Total Users",
                    value: users.length,
                    description: "All registered users",
                    icon: <Users className="text-blue-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent"
                },
                {
                    title: "Active Users",
                    value: users.filter(u => u.status?.id === StatusEnum.ACTIVE).length.toString(),
                    description: "Currently active accounts",
                    icon: <Users className="text-emerald-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent"
                },
                {
                    title: "Administrators",
                    value: users.filter(u => u.role?.id === RoleEnum.ADMINISTRATOR).length.toString(),
                    description: "With full system access",
                    icon: <Users className="text-orange-500" />,
                    className: "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group bg-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent"
                },
            ]);
        }
    }, [users]);

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
