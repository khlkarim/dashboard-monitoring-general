import {
  Mail,
  MessageSquare,
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
        url: "/dashboard/crm",
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
        url: "/dashboard/coming-soon",
        icon: Kanban, // sprints = board/kanban
        comingSoon: true,
      },
      {
        title: "Tasks",
        url: "/dashboard/coming-soon",
        icon: ReceiptText, // tasks/document style
        comingSoon: true,
      },
      {
        title: "KPIs",
        url: "/dashboard/coming-soon",
        icon: Gauge, // gauge = performance metrics
        comingSoon: true,
      },
      {
        title: "Reports",
        url: "/dashboard/coming-soon",
        icon: ClipboardList,
        comingSoon: true,
      },
      {
        title: "Risks",
        url: "/dashboard/coming-soon",
        icon: Shield,
        comingSoon: true,
      },
      {
        title: "Alumni",
        url: "/dashboard/coming-soon",
        icon: Users, // alumni = group of users
        comingSoon: true,
      },
      {
        title: "Notifications",
        url: "/dashboard/coming-soon",
        icon: Mail, // notification = mail/envelope
        comingSoon: true,
      },
      {
        title: "Chat",
        url: "/dashboard/coming-soon",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "Users",
        url: "/dashboard/coming-soon",
        icon: Users,
        comingSoon: true,
      },
      {
        title: "Roles",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
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
