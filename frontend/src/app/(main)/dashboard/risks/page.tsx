"use client";

import { RisksTable } from "./_components/risks-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertOctagon, ShieldCheck, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function RisksPage() {
    const { data: risksData, isLoading } = useGetRisks();

    const risks = risksData?.data || [];

    const calculateRPN = (r: any) => (r.severity || 0) * (r.occurrence || 0) * (r.detection || 0);

    const stats = {
        total: risks.length,
        critical: risks.filter(r => calculateRPN(r) >= 200).length,
        high: risks.filter(r => {
            const rpn = calculateRPN(r);
            return rpn >= 100 && rpn < 200;
        }).length,
        low: risks.filter(r => calculateRPN(r) < 100).length,
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Risk Register</h1>
                <p className="text-muted-foreground text-lg">
                    Identify, assess, and mitigate project risks.
                </p>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">{stats.total}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            Identified risks
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
                        <AlertOctagon className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-destructive">{stats.critical}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            RPN &ge; 200
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-orange-500">{stats.high}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            RPN 100 - 199
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manageable</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-7 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-green-500">{stats.low}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            RPN &lt; 100
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6">
                <RisksTable />
            </div>
        </div>
    );
}

export default withAuth(RisksPage);
