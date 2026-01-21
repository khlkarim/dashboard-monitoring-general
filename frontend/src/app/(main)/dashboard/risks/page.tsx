"use client";

import { RisksTable } from "./_components/risks-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";

function RisksPage() {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <RisksTable />
        </div>
    );
}

export default withAuth(RisksPage);
