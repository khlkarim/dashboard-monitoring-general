"use client";

import { useCallback, useState } from "react";
import { Scheduler, SchedulerData, SchedulerProjectData } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { Separator } from "@/components/ui/separator";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

// associates a task to each processus by name
const tasks: SchedulerProjectData[] = [
  {
    id: "project-planning",
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 0, 15),
    occupancy: 3600, // 1 hour per day
    title: "Project Planning",
    description: "Define project scope, requirements, and timeline",
    bgColor: "rgb(59, 130, 246)", // blue
  },
  {
    id: "project-execution",
    startDate: new Date(2025, 0, 16),
    endDate: new Date(2025, 1, 15),
    occupancy: 28800, // 8 hours per day
    title: "Project Execution",
    description: "Execute the project plans",
    bgColor: "rgb(16, 185, 129)", // green
  },
  {
    id: "project-closure",
    startDate: new Date(2025, 2, 16),
    endDate: new Date(2025, 2, 31),
    occupancy: 14400, // 4 hours per day
    title: "Project Closure",
    description: "Close the project",
    bgColor: "rgb(239, 68, 68)", // red
  },
];

function Page() {
  const { data: processus, isLoading, isError } = useGetProcessus();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">Loading scheduler...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive font-medium">Error loading data</p>
      </div>
    );
  }

  const schedulerData: SchedulerData = processus?.data.map((p) => ({
    id: p.id,
    label: {
      icon: "📋",
      title: p.label,
      subtitle: p.description ?? "",
    },
    data: tasks.map(task => ({
      ...task,
      id: `${p.id}-${task.id}` // Ensure unique IDs per row
    })),
  })) || [];

  return (
    <div className="flex flex-col gap-6 mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 p-6 max-w-[1600px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Annual Calendar</h1>
          <p className="text-muted-foreground text-lg">
            Interactive scheduler visualization of project timeline and team
            resources.
          </p>
        </div>

        <Separator />
      </div>


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
            filterButtonState,
            maxRecordsPerPage: 50,
            lang: "en",
            showTooltip: true,
            showThemeToggle: true,
            defaultTheme: "dark",
          }}
        />
      </div>
    </div>
  );
}

export default withAuth(Page);