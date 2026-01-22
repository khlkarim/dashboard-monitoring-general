"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ArrowLeft, Calendar, FileText, Hash, Timer } from "lucide-react";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { kpisApi } from "@/features/kpis/api/kpis.api";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KpiChart } from "./_components/kpi-chart";

function KpiDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();
    const [kpi, setKpi] = useState<Kpi | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const kpiId = params.kpiId as string;

    useEffect(() => {
        const fetchKpi = async () => {
            try {
                setLoading(true);
                const data = await kpisApi.findOne(kpiId);
                setKpi(data);
            } catch (err) {
                setError("Failed to load kpi details");
                console.error("Error fetching kpi:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchKpi();
    }, [kpiId]);

    const handleClose = () => {
        if (kpi) {
            // Remove sprint from navigation sidebar
            removeSubNavItem(2, "KPIs", kpi.name);
        }
        // Navigate back to sprints page
        router.push("/dashboard/kpis");
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                </div>
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    if (error || !kpi) {
        return (
            <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-[50vh]">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>{error || "KPI not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="secondary" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to KPIs
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard/kpis')}>KPIs</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">{kpi.name}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{kpi.name}</h1>
                        <p className="text-muted-foreground text-lg">{kpi.description || "No description provided."}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sampling Rate</CardTitle>
                        <Timer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.samplingRate || "--"}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Frequency of data collection
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
                        <Hash className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.samples?.length || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Data points recorded
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Created</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.createdAt ? format(new Date(kpi.createdAt), "MMM d, yyyy") : "--"}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Creation date
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Chart Visualization */}
                    {kpi.samples && kpi.samples.length > 0 && (
                        <KpiChart samples={kpi.samples} kpiName={kpi.name} />
                    )}

                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Samples History
                            </CardTitle>
                            <CardDescription>Recent data points collected for this KPI.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {kpi.samples && kpi.samples.length > 0 ? (
                                <div className="space-y-2">
                                    {kpi.samples.map((sample, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 border rounded-md bg-muted/20">
                                            <span className="font-mono text-sm">{sample}</span>
                                            <span className="text-xs text-muted-foreground">Sample #{index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">No samples recorded yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">ID</span>
                                <code className="text-xs bg-muted p-1 rounded block truncate max-w-[150px]">{kpi.id}</code>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    {kpi.createdBy ? `${kpi.createdBy.firstName} ${kpi.createdBy.lastName}` : "Unknown"}
                                </span>
                            </div>
                            {kpi.sprint && (
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Sprint</span>
                                    <Badge variant="outline">{kpi.sprint.name}</Badge>
                                </div>
                            )}
                            {kpi.processus && (
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Processus</span>
                                    <Badge variant="outline">{kpi.processus.label}</Badge>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default withAuth(KpiDetailPage);
