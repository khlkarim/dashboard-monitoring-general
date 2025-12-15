"use client";

import { SprintsTable } from "./_components/sprints-table";

export default function SprintsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SprintsTable />
    </div>
  );
}