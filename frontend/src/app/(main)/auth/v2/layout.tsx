"use client";

import Image from 'next/image';
import { ReactNode } from "react";
import { APP_CONFIG } from "@/config/app-config";
import { Separator } from "@/components/ui/separator";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const themeMode = usePreferencesStore(state => state.themeMode);

  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="bg-primary relative order-2 hidden h-full rounded-3xl lg:flex">
          <div className="absolute top-10 space-y-1 px-10">
            <div>
              {themeMode === 'light'? 
                <Image alt="JE" src="/logo-light.png" width={30} height={30} />
                :
                <Image alt="JE" src="/logo-dark.png" width={30} height={30} />
              }
              <h1 className="text-2xl font-medium">{APP_CONFIG.name}</h1>
              <p className="text-sm">Design. Build. Launch. Repeat.</p>

            </div>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1">
              <h2 className="font-medium">Ready to launch?</h2>
              <p className="text-sm">Clone the repo, install dependencies, and your dashboard is live in minutes.</p>
            </div>
            <Separator orientation="vertical" className="mx-3 !h-auto" />
            <div className="flex-1 space-y-1">
              <h2 className="font-medium">Need help?</h2>
              <p className="text-sm">
                Check out the docs or open an issue on GitHub, community support is just a click away.
              </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
