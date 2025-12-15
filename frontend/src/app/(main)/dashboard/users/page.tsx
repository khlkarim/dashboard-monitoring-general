"use client";

import { UsersTable } from "./_components/users-table";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <UsersTable />
    </div>
  );
}