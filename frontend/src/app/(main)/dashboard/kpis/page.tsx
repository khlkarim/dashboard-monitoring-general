"use client";

import { Header } from "@/components/common/header";
import { KpisStats } from "./_components/kpis-stats";
import { Separator } from "@/components/ui/separator";
import { LoadingPage } from "@/components/common/loading-page";
import { useGetKpis } from "@/features/kpis/hooks/use-get-kpis";
import { ErrorDisplay } from "@/components/common/error-display";
import { ProcessusToKpis } from "./_components/processus-to-kpis";
import { withAuth } from "@/features/auth/components/with-auth";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

function KpisPage() {
    const { 
        data: kpis,
        isPending: isPendingKpis,
        isError: isErrorKpis,
        error: errorKpis, 
    } = useGetKpis({});

    const {
        data: processus,
        isPending: isPendingProcessus,
        isError: isErrorProcessus,
        error: errorProcessus,
    } = useGetProcessus();

    if(isErrorKpis || isErrorProcessus) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay 
                    title={"Failed to load sprints."}
                    error={isErrorKpis? errorKpis : errorProcessus} 
                />
            </div>
        );
    }

    if(isPendingKpis || isPendingProcessus) {
        return (
            <LoadingPage />  
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header 
                title="KPI Register"
                description="Track key performance indicators and metrics."
            />
            <Separator />
            
            <KpisStats kpis={kpis.data} />
            
            <ProcessusToKpis 
                kpis={kpis.data} 
                processus={processus.data} 
            />
        </div>
    );
}

export default withAuth(KpisPage);