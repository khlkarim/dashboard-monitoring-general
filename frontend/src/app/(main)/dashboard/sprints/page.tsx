"use client";

import { SprintsTable } from "./_components/sprints-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";

function SprintsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SprintsTable />
    </div>
  );
}

export default withAuth(SprintsPage);