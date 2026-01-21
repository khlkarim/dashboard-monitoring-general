"use client";

import { withAuth } from "@/features/auth/components/guards/withAuth";
import { InsightCards } from "./_components/insight-cards";

function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <InsightCards />
    </div>
  );
}

export default withAuth(Page);