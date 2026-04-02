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
            <div className='text-white'>
              {/* {themeMode === 'light'?  */}
              <Image alt="JE" src="/logo-dark.png" width={30} height={30} />
              {/* : */}
              {/* <Image alt="JE" src="/logo-light.png" width={30} height={30} /> */}
              {/* } */}
              <h1 className="text-2xl font-medium">{APP_CONFIG.name}</h1>
              <p className="text-sm">Build. Launch. Repeat.</p>

            </div>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1 text-white">
              <h2 className="font-medium">Who we are?</h2>
              <p className="text-sm">
                INSAT Junior Enterprise is a non-profit organization founded in 2005
                that bridges the gap between academic learning and the professional world.
              </p>
            </div>

            <Separator orientation="vertical" className="mx-3 h-auto! bg-white" />

            <div className="flex-1 space-y-1 text-white">
              <h2 className="font-medium">What we do?</h2>
              <p className="text-sm">
                We train students in entrepreneurship through real-world projects,
                delivering services in web development, mobile application development,
                and search engine optimization (SEO).
              </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
