"use client";

import { AlumniTable } from "./_components/alumni-table";

export default function AlumniPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <AlumniTable />
    </div>
  );
}