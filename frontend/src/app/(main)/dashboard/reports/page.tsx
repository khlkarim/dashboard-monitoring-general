"use client";

import { withAuth } from "@/features/auth/components/with-auth";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useGetUsers } from "@/features/users/hooks/use-get-users";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { SectionCards } from "./_components/section-cards";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/common/header";
import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks";
import { MemberStatistics } from "./_components/member-statistics";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Page() {
    const { user } = useAuthStore();
    const { data: sprints } = useGetSprints();
    const { data: tasks } = useGetTasks();
    const { data: users } = useGetUsers();
    const { data: risks } = useGetRisks();
    const { data: kpis } = useGetKpis({});
    const { data: notifications } = useGetNotifications(user?.id || "");

    const dashboardData = {
        sprints: sprints?.data || [],
        tasks: tasks?.data || [],
        users: users?.data || [],
        risks: risks?.data || [],
        kpis: kpis?.data || [],
        notifications: notifications?.data || [],
    };

    const membersList = users?.data || [];
    const [selectedMemberId, setSelectedMemberId] = useState<string>(membersList[0]?.id || "");

    return (
        <div className="@container/main flex flex-col gap-6 p-6">
            <Header 
                title="Reports & Analytics"
                description="Detailed analytical overview and member statistics."
            />

            <Separator />

            <SectionCards data={dashboardData} />

            <Separator />

            {/* Member Statistics Dropdown */}
            {membersList.length > 0 && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Member Statistics</CardTitle>
                            <CardDescription>
                                Select a member to view their detailed performance statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select 
                                value={selectedMemberId} 
                                onValueChange={setSelectedMemberId}
                            >
                                <SelectTrigger className="w-full md:w-[300px]">
                                    <SelectValue placeholder="Select a member" />
                                </SelectTrigger>
                                <SelectContent>
                                    {membersList.map((member) => (
                                        <SelectItem key={member.id} value={member.id}>
                                            {member.firstName} {member.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {selectedMemberId && (
                        <MemberStatistics userId={selectedMemberId} />
                    )}
                </div>
            )}
        </div>
    );
}

export default withAuth(Page);
