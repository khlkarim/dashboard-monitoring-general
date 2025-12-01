"use client";

import { TableCards } from "./_components/table-cards";
import { withAuth } from "@/features/auth/components/guards/withAuth";

function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards />
    </div>
  );
}

export default withAuth(Page);