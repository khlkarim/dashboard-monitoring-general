"use client";

import { isAfter, isBefore } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import {
    GanttFeatureList,
    GanttHeader,
    GanttProvider,
    GanttSidebar,
    GanttSidebarGroup,
    GanttSidebarItem,
    GanttTimeline,
    GanttToday,
    GanttFeatureItem,
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

export function GanttCalendar({ processus, activities }: GanttCalendarProps) {
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // 1. Prepare activities with their Gantt metadata
    const preparedActivities = useMemo(() => {
        return activities
            .filter(a => a.startDate && a.endDate)
            .map((activity) => {
                const startAt = new Date(activity.startDate!);
                const endAt = new Date(activity.endDate!);

                const feature: GanttFeature = {
                    id: activity.id,
                    name: activity.title ?? "Untitled activity",
                    startAt,
                    endAt,
                    status: resolveStatus(startAt, endAt),
                };

                return { feature, activity };
            });
    }, [activities]);

    // 2. Filter by Activity title OR associated Processus label
    const filteredActivities = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return preparedActivities;

        return preparedActivities.filter(({ activity }) =>
            activity.title?.toLowerCase().includes(q) ||
            activity.processus.some(p => p.label.toLowerCase().includes(q))
        );
    }, [preparedActivities, search]);

    const zoom = useMemo(() => {
        if (typeof window === "undefined") return 100;
        if (window.innerWidth < 640) return 50;
        return 100;
    }, []);

    if (!mounted) return <div className="h-[400px] w-full bg-muted/50 animate-pulse" />;

    return (
        <div className="w-full overflow-x-auto">
            <GanttProvider className="min-w-[900px] border rounded-lg" range="monthly" zoom={zoom}>
                <GanttSidebar className="min-w-[250px] max-w-[300px]">
                    {/*<div className="m-3">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search activities or processus..."
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>*/}
                    {/* Display Activities as main items in sidebar */}
                    {filteredActivities.map(({ feature, activity }) => (
                        <GanttSidebarGroup
                            key={activity.id}
                            name={activity.title || ""}
                        >
                            {activity.processus.map(p => <GanttSidebarItem key={p.id} feature={{ ...feature, name: p.label }} />)}
                        </GanttSidebarGroup>
                    ))}
                </GanttSidebar>

                <GanttTimeline>
                    <GanttHeader />
                    <GanttFeatureList>
                        {filteredActivities.map(({ feature, activity }) => (
                            <div key={feature.id}>
                                {/* Main activity bar (aligns with sidebar group header) */}
                                <ActivityGanttFeature
                                    feature={feature}
                                    activity={activity}
                                />

                                {/* Nested processus rows (align with sidebar group children) */}
                                <div className="divide-y divide-border/50">
                                    {activity.processus.map((p) => (
                                        <GanttFeatureItem
                                            key={p.id}
                                            id={`${feature.id}-${p.id}`}
                                            name={p.label}
                                            startAt={feature.startAt}
                                            endAt={feature.endAt}
                                            className="opacity-50"
                                            status={STATUSES["planned"]}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </GanttFeatureList>

                    <GanttToday />
                </GanttTimeline>
            </GanttProvider>
        </div>
    );
}
