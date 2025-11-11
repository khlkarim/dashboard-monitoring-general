import {
  Mail,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  LayoutDashboard,
  Banknote,
  Gauge,
  type LucideIcon,
  Shield,
  ClipboardList,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
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
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
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
        title: "Tasks",
        url: "/dashboard/tasks",
        icon: ReceiptText, // tasks/document style
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
        icon: Users, // alumni = group of users
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Mail, // notification = mail/envelope
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Roles",
        url: "/dashboard/roles",
        icon: Lock,
      },
      {
        title: "Authentication",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Login v1", url: "/auth/v1/login", newTab: true },
          { title: "Login v2", url: "/auth/v2/login", newTab: true },
          { title: "Register v1", url: "/auth/v1/register", newTab: true },
          { title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  }
];
