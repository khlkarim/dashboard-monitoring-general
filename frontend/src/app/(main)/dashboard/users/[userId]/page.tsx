"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserInfo } from "../_components/user-info";
import { Separator } from "@/components/ui/separator";
import { UserStats } from "../_components/user-stats";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { LoadingPage } from "@/components/common/loading-page";
import { ErrorDisplay } from "@/components/common/error-display";
import { StatusEnum } from "@/features/users/schemas/users.schemas";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { useGetUserById } from "@/features/users/hooks/use-get-user-by-id";

function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const userId = params.userId as string;
    const { 
        data: user, 
        isPending, 
        isError,
        error 
    } = useGetUserById({ id: userId });

    const handleClose = () => {
        if (user) {
            // Remove from navigation sidebar
            removeSubNavItem(2, "Users", `${user.firstName} ${user.lastName}`);
        }
        // Navigate back to users list page
        router.push("/dashboard/users");
    };

    if(isError) {
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
                title={fullName}
                description={
                    <>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-muted-foreground">
                                {user.role?.name || "No Role"}
                            </Badge>
                            {user.status && (
                                <Badge variant={user.status.name === StatusEnum.ACTIVE ? 'default' : 'secondary'}>
                                    {user.status.name}
                                </Badge>
                            )}
                        </div>
                    </>
                }    
                breadcrumbs={[
                    { 
                        label: "Users",
                        onClick: () => router.push('/dashboard/users')
                    },
                    { 
                        label: fullName,
                    }
                ]} 
                actions={
                    <>
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                    </>
                }
            />
            
            <Separator />
            <UserStats user={user} />
            <UserInfo user={user} />
        </div>
    );
}

export default withAuth(UserDetailPage);
