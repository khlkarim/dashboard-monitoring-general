"use client";

import { KpisTable } from "./_components/kpis-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Database, FileSpreadsheet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function KpisPage() {
  const { data: kpisData, isLoading } = useGetKpis({});

  const kpis = kpisData?.data || [];

  const stats = {
    total: kpis.length,
    sampled: kpis.filter((k) => k.samples && k.samples.length > 0).length,
    definedRates: kpis.filter((k) => k.samplingRate).length,
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">KPIs</h1>
        <p className="text-muted-foreground text-lg">
          Track key performance indicators and metrics.
        </p>
      </div>

      <Separator />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total KPIs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats.total}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Defined metrics
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Data</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-blue-500">{stats.sampled}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              KPIs collecting samples
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defined Rates</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-500">{stats.definedRates}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Sampling rates configured
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <KpisTable />
      </div>
    </div>
  );
}

export default withAuth(KpisPage);