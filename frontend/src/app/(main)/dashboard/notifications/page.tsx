"use client";

import { withAuth } from "@/features/auth/components/guards/withAuth";
import { NotificationsList } from "./_components/notifications-list";

function Page() {
  return <NotificationsList />;
}

export default withAuth(Page);