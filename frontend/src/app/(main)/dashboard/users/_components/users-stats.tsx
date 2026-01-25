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
            setStats([
                {
                    title: "Total Users",
                    value: users.length,
                    description: "All registered users",
                    icon: <Users />
                },
                {
                    title: "Active Users",
                    value: users.filter(u => u.status?.name === StatusEnum.ACTIVE).length.toString(),
                    description: "Currently active accounts",
                },
                {
                    title: "Administrators",
                    value: users.filter(u => u.role?.name === RoleEnum.ADMINISTRATOR).length.toString(),
                    description: "With full system access",
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
                        title={stat.title}          
                        value={stat.value}
                        description={stat.description}     
                    />
                );
            })}
        </div>
    );
}
