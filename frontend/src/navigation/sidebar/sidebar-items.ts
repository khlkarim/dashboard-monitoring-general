import {
  Calendar,
  Kanban,
  Users,
  LayoutDashboard,
  Gauge,
  Shield,
  ClipboardList,
  CircleUser,
  Archive,
  Bell,
} from "lucide-react";
import { NavGroup } from "../types/navigation.types";

export const defaultSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Home",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "Annual Calendar",
        url: "/dashboard/annual-calendar",
        icon: Calendar, // calendar instead of ChartBar
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        title: "Sprints",
        url: "/dashboard/sprints",
        icon: Kanban, // sprints = board/kanban
      },
      {
        title: "KPIs",
        url: "/dashboard/kpis",
        icon: Gauge, // gauge = performance metrics
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: ClipboardList,
      },
      {
        title: "Risks",
        url: "/dashboard/risks",
        icon: Shield,
      },
      {
        title: "Alumni",
        url: "/dashboard/alumni",
        icon: Archive,
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell, // notification = mail/envelope
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Account",
        url: "/dashboard/account",
        icon: CircleUser,
      }
    ],
  }
];
