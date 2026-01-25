import { SchedulerProjectData } from "@bitnoi.se/react-scheduler";

/**
 * this is dummy data until we figure out what process activities are.
 */
export const activities: SchedulerProjectData[] = [
  {
    id: "project-planning",
    startDate: new Date(2026, 0, 1),
    endDate: new Date(2026, 0, 15),
    occupancy: 1, // 1 hour per day
    title: "Project Planning",
    description: "Define project scope, requirements, and timeline",
    bgColor: "rgb(59, 130, 246)", // blue
  },
  {
    id: "project-execution",
    startDate: new Date(2026, 0, 16),
    endDate: new Date(2026, 1, 15),
    occupancy: 1, // 8 hours per day
    title: "Project Execution",
    description: "Execute the project plans",
    bgColor: "rgb(16, 185, 129)", // green
  },
];