import { format } from "date-fns";
import { useEffect, useState } from "react";
import { User } from "@/features/users/types/users.types";
import { Calendar, Shield, UserIcon } from "lucide-react";
import { StatCard, StatCardProps } from "@/components/common/stat-card";

interface UserStatsProps {
    user: User;
}

/** 
 * currently this is just the same code as UserStats 
 * but its copied here because its highly likely that it will change
*/
export function AlumniStats({ user }: UserStatsProps) {
    const [stats, setStats] = useState<StatCardProps[]>([]);

    useEffect(() => {
        if(user) {
            setStats([
                {
                    title: "Role",
                    value: user.role?.name || "--",
                    description: "System Access Level",
                    icon: <Shield />
                },
                {
                    title: "Account Status",
                    value: user.status?.name || "--",
                    description: "Current Account State",
                    icon: <UserIcon />
                },
                {
                    title: "Joined On",
                    value: user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "--",
                    description: "Registration Date",
                    icon: <Calendar />
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
                        title={stat.title}          
                        value={stat.value}
                        description={stat.description}     
                    />
                );
            })}
        </div>
    );
}