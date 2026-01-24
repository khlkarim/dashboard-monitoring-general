"use client";

import { Button } from "@/components/ui/button";
import { KpiInfo } from "../_components/kpi-info";
import { KpiStats } from "../_components/kpi-stats";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { KpiSamples } from "../_components/kpi-samples";
import { PageHeader } from "@/components/common/page-header";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetKpiById } from "@/features/kpis/hooks/use-get-kpi-by-id";
import { useNavigationStore } from "@/navigation/store/navigation.store";

function KpiDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const kpiId = params.kpiId as string;

    const { 
        data: kpi,
        isPending,
        isError,
        error,
    } = useGetKpiById(kpiId);

    function handleClose() {
        if (kpi) {
            removeSubNavItem(2, "Kpis", kpi.name || "Untitled Kpi");
        }
        router.push("/dashboard/kpis");
    };

    if (isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay
                    title="Failed to load Kpi data."
                    error={error}
                />
            </div>
        );
    }

    if (isPending) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <PageHeader 
                title={kpi.name}
                description={kpi.description}    
                breadcrumbs={[
                    { 
                        label: "Kpis",
                        onClick: () => router.push('/dashboard/kpis')
                    },
                    { 
                        label: kpi.name,
                    }
                ]} 
                actions={
                    <>
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                    </>
                }
            />

            <Separator />

            <KpiStats kpi={kpi} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <KpiSamples kpi={kpi} />
                <KpiInfo kpi={kpi} />
            </div>
        </div>
    );
}

export default withAuth(KpiDetailPage);
