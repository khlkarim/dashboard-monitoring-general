"use client";

import { KpisTable } from "./_components/kpis-table";

export default function KpisPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <KpisTable />
    </div>
  );
}