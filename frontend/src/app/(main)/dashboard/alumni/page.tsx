"use client";

import { AlumniTable } from "./_components/alumni-table";
import { useGetAlumni } from "@/features/users/hooks/use-get-alumni";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function AlumniPage() {
  const { data: alumniData, isLoading } = useGetAlumni({ limit: 1000 });

  const stats = {
    total: alumniData?.data.length || 0,
    // metrics for future expansion, e.g. employed, looking for work etc.
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Alumni Network</h1>
        <p className="text-muted-foreground text-lg">
          Manage former members and track their professional progress.
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <AlumniTable />
      </div>
    </div>
  );
}