"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { sprintsApi } from "@/features/sprints/api/sprints.api";
import { Sprint } from "@/features/sprints/types/sprints.types";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ArrowLeft } from "lucide-react";
import KanbanBoardComponent from "../_components/kanban-board";

function SprintDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();
    const [sprint, setSprint] = useState<Sprint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sprintId = params.sprintId as string;

    useEffect(() => {
        const fetchSprint = async () => {
            try {
                setLoading(true);
                const data = await sprintsApi.findOne(sprintId);
                setSprint(data);
            } catch (err) {
                setError("Failed to load sprint details");
                console.error("Error fetching sprint:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSprint();
    }, [sprintId]);

    const handleClose = () => {
        if (sprint) {
            // Remove sprint from navigation sidebar
            removeSubNavItem(2, "Sprints", sprint.name);
        }
        // Navigate back to sprints page
        router.push("/dashboard/sprints");
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    if (error || !sprint) {
        return (
            <div className="flex flex-col gap-4 md:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>{error || "Sprint not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sprints
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-2">
                <Button onClick={handleClose} variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Close
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{sprint.name}</CardTitle>
                    <CardDescription>Sprint Details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                        <p className="text-sm">{sprint.goal || "No description provided"}</p>
                    </div>
                </CardContent>
            </Card>
            <KanbanBoardComponent />
        </div>
    );
}

export default withAuth(SprintDetailPage);
