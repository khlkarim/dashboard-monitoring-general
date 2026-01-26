"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { withAuth } from "@/features/auth/components/with-auth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Image from 'next/image'
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export const AppSidebar = withAuth(({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const user = useAuthStore((state) => state.user);
  const themeMode = usePreferencesStore((state) => state.themeMode);
  const sidebarItems = useNavigationStore((state) => state.sidebarItems);

  if (!user) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard/default">
                {themeMode === 'light'? 
                  <Image alt="JE" src="/logo-light.png" width={17} height={17} />
                  :
                  <Image alt="JE" src="/logo-dark.png" width={17} height={17} />
                }
                <span className="text-base font-semibold">{APP_CONFIG.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
});