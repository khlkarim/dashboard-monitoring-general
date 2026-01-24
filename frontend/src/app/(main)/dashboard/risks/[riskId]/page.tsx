"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskInfo } from "../_components/risk-info";
import { RiskStats } from "../_components/risk-stats";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ActionTabs } from "../_components/action-tabs";
import { PageHeader } from "@/components/common/page-header";
import { BaseDialog } from "@/components/common/form-dialog";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ActionForm } from "@/features/actions/components/action-form";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { useGetRiskById } from "@/features/risks/hooks/use-get-risk-by-id";
import { useCreateAction } from "@/features/actions/hooks/use-create-action";

function RiskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const riskId = params.riskId as string;
    const { 
        data: risk,
        isPending,
        isFetching,
        isError,
        error,
    } = useGetRiskById(riskId);

    const createActionMutation = useCreateAction();
    const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);

    function handleClose() {
        if (risk) {
            removeSubNavItem(2, "Risks", risk.title || "Untitled Risk");
        }
        router.push("/dashboard/risks");
    };

    async function handleCreateActionSubmit(data: any) {
        createActionMutation.mutateAsync({
            ...data,
            risk: { id: riskId }
        });
        setIsCreateActionOpen(false);
    };

    if (isError) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay
                    title="Failed to load risk data."
                    error={error}
                />
            </div>
        );
    }

    if (isPending || isFetching) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <PageHeader 
                title={risk.title}
                description={risk.description}    
                breadcrumbs={[
                    { 
                        label: "Risks",
                        onClick: () => router.push('/dashboard/risks')
                    },
                    { 
                        label: risk.title,
                    }
                ]} 
                actions={
                    <>
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                        <Button onClick={() => setIsCreateActionOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add Action
                        </Button>
                    </>
                }
            />

            <Separator />

            <RiskStats risk={risk} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <ActionTabs risk={risk} />
                <RiskInfo risk={risk} />
            </div>

            <BaseDialog 
                open={isCreateActionOpen}
                onOpenChange={setIsCreateActionOpen}
                title="Create Action"
                description="Create a mitigation action."
            >
                <ActionForm
                    onSubmit={handleCreateActionSubmit}
                    isLoading={createActionMutation.isPending}
                />
            </BaseDialog>
        </div>
    );
}

export default withAuth(RiskDetailPage);
