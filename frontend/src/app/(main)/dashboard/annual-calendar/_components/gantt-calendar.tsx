"use client";

import { isAfter, isBefore } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttHeader,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
  GanttStatus,
  GanttFeature,
} from "@/components/ui/gantt"; // adjust import path if needed

import { Processus } from "@/features/processus/types/processus.types";
import { Activity } from "@/features/activities/types/activities.types";

const STATUSES: Record<"planned" | "inProgress" | "done", GanttStatus> = {
  planned: { id: "planned", name: "Planned", color: "#6B7280" },
  inProgress: { id: "inProgress", name: "In Progress", color: "#F59E0B" },
  done: { id: "done", name: "Done", color: "#10B981" },
};

function resolveStatus(start: Date, end: Date): GanttStatus {
  const now = new Date();

  if (isAfter(start, now)) return STATUSES.planned;
  if (isBefore(end, now)) return STATUSES.done;
  return STATUSES.inProgress;
}

interface GanttCalendarProps {
  processus: Processus[];
  activites: Activity[];
}

export function GanttCalendar({
  processus,
  activites,
}: GanttCalendarProps) {
  const [mounted, setMounted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------------------------------
     Transform backend data → Gantt features
  ------------------------------------------- */

  const featuresByProcessus = useMemo(() => {
    const map = new Map<string, GanttFeature[]>();

    for (const activity of activites) {
      if (!activity.startDate || !activity.endDate) continue;

      const startAt = new Date(activity.startDate);
      const endAt = new Date(activity.endDate);

      const feature: GanttFeature = {
        id: activity.id,
        name: activity.title ?? "Untitled activity",
        startAt,
        endAt,
        status: resolveStatus(startAt, endAt),
      };

      const pid = activity.processus.id;

      if (!map.has(pid)) {
        map.set(pid, []);
      }

      map.get(pid)!.push(feature);
    }

    return map;
  }, [activites]);

  /* -------------------------------------------
     Drag handling (local-only for now)
  ------------------------------------------- */

  const handleMoveFeature = useCallback(
    (_id: string, _startAt: Date, _endAt: Date | null) => {
      // noop for now
    },
    []
  );

  /* -------------------------------------------
     Responsive zoom
  ------------------------------------------- */

  const zoom = useMemo(() => {
    if (typeof window === "undefined") return 100;
    if (window.innerWidth < 640) return 50;
    if (window.innerWidth < 1024) return 75;
    return 100;
  }, []);

  /* -------------------------------------------
     SSR guard (necessary for dnd-kit)
  ------------------------------------------- */

  if (!mounted) {
    return <div className="h-[400px] w-full bg-muted/50 animate-pulse" />;
  }

  return (
    <div className="w-full">
      {/* Mobile sidebar toggle */}
      <div className="flex items-center justify-between mb-2 md:hidden">
        <button
          onClick={() => setShowSidebar(s => !s)}
          className="text-sm px-3 py-1 border rounded-md"
        >
          {showSidebar ? "Hide groups" : "Show groups"}
        </button>
      </div>

      {/* Scroll container */}
      <div className="relative w-full overflow-x-auto">
        <GanttProvider
          className="min-w-[900px] border rounded-lg"
          range="monthly"
          zoom={zoom}
        >
          {/* Sidebar */}
          {showSidebar && (
            <GanttSidebar className="min-w-[220px] max-w-[260px]">
              {processus.map(proc => (
                <GanttSidebarGroup key={proc.id} name={proc.label}>
                  {(featuresByProcessus.get(proc.id) ?? []).map(feature => (
                    <GanttSidebarItem key={feature.id} feature={feature} />
                  ))}
                </GanttSidebarGroup>
              ))}
            </GanttSidebar>
          )}

          {/* Timeline */}
          <GanttTimeline>
            <GanttHeader />

            <GanttFeatureList>
              {processus.map(proc => (
                <GanttFeatureListGroup key={proc.id}>
                  {(featuresByProcessus.get(proc.id) ?? []).map(feature => (
                    <GanttFeatureItem
                      key={feature.id}
                      {...feature}
                      onMove={handleMoveFeature}
                    >
                      <p className="flex-1 truncate text-[10px] sm:text-xs">
                        {feature.name}
                      </p>
                    </GanttFeatureItem>
                  ))}
                </GanttFeatureListGroup>
              ))}
            </GanttFeatureList>

            <GanttToday />
          </GanttTimeline>
        </GanttProvider>
      </div>
    </div>
  );
}
