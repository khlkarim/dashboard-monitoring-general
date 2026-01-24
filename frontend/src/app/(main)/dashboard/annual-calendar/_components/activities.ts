import { SchedulerProjectData } from "@bitnoi.se/react-scheduler";

/**
 * this is dummy data until we figure out what process activities are.
 */
export const activities: SchedulerProjectData[] = [
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