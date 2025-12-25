"use client";

import { KpisTable } from "./_components/kpis-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";

function KpisPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <KpisTable />
    </div>
  );
}

export default withAuth(KpisPage);