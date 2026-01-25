"use client";

import { UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { AlumniInfo } from "../_components/alumni-info";
import { AlumniStats } from "../_components/alumni-stats";
import { PageHeader } from "@/components/common/page-header";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { withAuth } from "@/features/auth/components/with-auth";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { useGetUserById } from "@/features/users/hooks/use-get-user-by-id";
import { StatusEnum } from "@/features/users/types/status.types";

/** 
 * currently this is just the same code as UserDetailPage 
 * but its copied here because its highly likely that it will change
*/
function AlumniDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const userId = params.alumniId as string;
    console.log(params);

    const {
        data: user,
        isPending,
        isError,
        error
    } = useGetUserById({ id: userId ?? "" });

    const handleClose = () => {
        if (user) {
            // Remove from navigation sidebar
            removeSubNavItem(2, "Alumni", `${user.firstName} ${user.lastName}`);
        }
        // Navigate back to users list page
        router.push("/dashboard/alumni");
    };

    if (isError) {
        return (
            <ErrorDisplay
                title="Failed to load user data."
                error={error}
            />
        );
    }

    if (isPending) {
        return (
            <LoadingPage />
        );
    }

    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User";

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <PageHeader
                title={
                    <div className="flex items-center gap-3 pb-2">
                        {user.photo ? (
                            <img
                                src={user.photo.path}
                                alt={fullName}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                <UserIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                        )}

                        <div className="flex flex-col">
                            {fullName}
                        </div>
                    </div>
                }
                description={
                    <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-muted-foreground">
                            {user.role?.name || "No Role"}
                        </Badge>

                        {user.status && (
                            <Badge
                                variant={
                                    user.status.name === StatusEnum.ACTIVE
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.status.name}
                            </Badge>
                        )}
                    </div>
                }
                breadcrumbs={[
                    {
                        label: "Alumni",
                        onClick: () => router.push("/dashboard/users"),
                    },
                    {
                        label: fullName,
                    },
                ]}
                actions={
                    <Button onClick={handleClose} variant="ghost">
                        Close
                    </Button>
                }
            />

            <Separator />
            <AlumniStats user={user} />
            <AlumniInfo user={user} />
        </div>
    );
}

export default withAuth(AlumniDetailPage);
