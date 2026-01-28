"use client";

import { isAfter, isBefore } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import {
    GanttFeatureList,
    GanttFeatureListGroup,
    GanttHeader,
    GanttProvider,
    GanttSidebar,
    GanttSidebarGroup,
    GanttSidebarItem,
    GanttTimeline,
    GanttToday,
} from "@/components/kibo-ui/gantt";

import { ActivityGanttFeature } from "./activity-gantt-feature";
import { GanttFeature, GanttStatus } from "@/components/ui/gantt";
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
  activities: Activity[];
}

export function GanttCalendar({
    processus,
    activities,
}: GanttCalendarProps) {
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    const filteredProcessus = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return processus;

        return processus.filter((p) =>
            p.label.toLowerCase().includes(q)
        );
    }, [processus, search]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const featuresByProcessus = useMemo(() => {
        const map = new Map<string, { feature: GanttFeature; activity: Activity }[]>();

        for (const activity of activities) {
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

            map.get(pid)!.push({feature, activity});
        }
        return map;
    }, [activities]);

    const zoom = useMemo(() => {
        if (typeof window === "undefined") return 100;
        if (window.innerWidth < 640) return 50;
        if (window.innerWidth < 1024) return 75;
        return 100;
    }, []);

    // SSR guard (important for gantt internals)
    if (!mounted) {
        return <div className="h-[400px] w-full bg-muted/50 animate-pulse" />;
    }

    return (
        <div className="w-full overflow-x-auto">
            <GanttProvider
                className="min-w-[900px] border rounded-lg"
                range="monthly"
                zoom={zoom}
            >
                {/* Sidebar */}
                <GanttSidebar className="min-w-[220px] max-w-[260px]">
                    <div className="m-3 max-w-sm">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by processus..."
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>
                    {filteredProcessus.map((proc) => (
                        <GanttSidebarGroup key={proc.id} name={proc.label}>
                            {(featuresByProcessus.get(proc.id) ?? []).map((fa) => (
                                <GanttSidebarItem key={fa.feature.id} feature={fa.feature} />
                            ))}
                        </GanttSidebarGroup>
                    ))}
                </GanttSidebar>

                {/* Timeline */}
                <GanttTimeline>
                    <GanttHeader />

                    <GanttFeatureList>
                        {filteredProcessus.map((proc) => (
                            <GanttFeatureListGroup key={proc.id}>
                                {(featuresByProcessus.get(proc.id) ?? []).map((fa) => (
                                    <ActivityGanttFeature 
                                        key={fa.feature.id} 
                                        feature={fa.feature} 
                                        activity={fa.activity}
                                    />
                                ))}
                            </GanttFeatureListGroup>
                        ))}
                    </GanttFeatureList>

                    <GanttToday />
                </GanttTimeline>
            </GanttProvider>
        </div>
    );
}
