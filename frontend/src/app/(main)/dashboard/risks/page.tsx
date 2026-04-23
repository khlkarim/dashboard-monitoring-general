"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { RisksStats } from "./_components/risks-stats";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetRisks } from "@/features/risks/hooks/use-get-risks";
import { withAuth } from "@/features/auth/components/with-auth";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import { ProcessusToRisks } from "./_components/processus-to-risks";

function RisksPage() {
    const {
        data: risks,
        isPending: isPendingRisks,
        isFetching: isFetchingRisks,
        isError: isErrorRisks,
        error: errorRisks
    } = useGetRisks();

    const {
        data: processus,
        isPending: isPendingProcessus,
        isError: isErrorProcessus,
        error: errorProcessus,
    } = useGetProcessus();

    if (isErrorRisks || isErrorProcessus) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay
                    title={"Failed to load risks."}
                    error={errorRisks || errorProcessus}
                />
            </div>
        );
    }

    if (isPendingRisks || isPendingProcessus || isFetchingRisks) {
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
            <ProcessusToRisks processus={processus.data} risks={risks.data} />
        </div>
    );
}

export default withAuth(RisksPage);
