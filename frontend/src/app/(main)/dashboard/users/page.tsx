"use client";

import { UsersTable } from "./_components/users-table";
import { withAuth } from "@/features/auth/components/guards/withAuth";

function UsersPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <UsersTable />
    </div>
  );
}

export default withAuth(UsersPage);