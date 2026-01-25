"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { RisksTable } from "./_components/risks-table";
import { RisksStats } from "./_components/risks-stats";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { withAuth } from "@/features/auth/components/with-auth";

function RisksPage() {
    const { 
        data: risks, 
        isPending,
        isFetching,
        isError,
        error    
    } = useGetRisks();

    if(isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay 
                    title={"Failed to load risks."}
                    error={error} 
                />
            </div>
        );
    }

    if(isPending || isFetching) {
        return (
            <LoadingPage />  
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header 
                title="Risk Register"
                description="Identify, assess, and mitigate project risks."
            />
            <Separator />
            <RisksStats risks={risks.data} />
            <RisksTable risks={risks.data} />
        </div>
    );
}

export default withAuth(RisksPage);
