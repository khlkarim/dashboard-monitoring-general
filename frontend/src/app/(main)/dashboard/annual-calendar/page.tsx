"use client";

import { activities } from "./_components/activities";
import { useCallback, useState } from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

function Page() {
    const { 
        data: processus, 
        isLoading, 
        isError,
        error
    } = useGetProcessus();

    const [filterButtonState, setFilterButtonState] = useState(0);
    const [, setRange] = useState({
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 5, 31),
    });

    const handleRangeChange = useCallback(
        (newRange: { startDate: Date; endDate: Date }) => {
        setRange(newRange);
        },
        []
    );

    const handleTileClick = useCallback((clickedResource: any) => {
        console.log("Tile clicked:", clickedResource);
    }, []);

    const handleItemClick = useCallback((item: any) => {
        console.log("Item clicked:", item);
    }, []);

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <ErrorDisplay
                    title="Failed to load annual calendar."
                    error={error}
                />
            </div>
        );
    }
    
    if (isLoading) {
        return (
            <LoadingPage />
        );
    }

    const schedulerData: SchedulerData = processus?.data.map((p) => ({
        id: p.id,
        label: {
        icon: "📋",
        title: p.label,
        subtitle: p.description ?? "",
        },
        data: activities.map(activity => ({
        ...activity,
        id: `${p.id}-${activity.id}`
        })),
    })) || [];

    return (
        <div className="flex flex-col gap-6 mx-auto animate-in fade-in duration-500">
            <Header 
                title="Annual Calendar"
                description="Interactive scheduler visualization of project timeline and team resources."
            />
            <Separator />

            <div className="relative h-[700px] w-full overflow-hidden rounded-lg border bg-card">
                <Scheduler
                    data={schedulerData}
                    onRangeChange={handleRangeChange}
                    onTileClick={handleTileClick}
                    onItemClick={handleItemClick}
                    onFilterData={() => setFilterButtonState(1)}
                    onClearFilterData={() => setFilterButtonState(0)}
                    config={{
                        zoom: 0,
                        lang: "en",
                        showTooltip: true,
                        filterButtonState,
                        defaultTheme: "dark",
                        showThemeToggle: true,
                        maxRecordsPerPage: 50,
                    }}
                />
            </div>
        </div>
    );
}

export default withAuth(Page);