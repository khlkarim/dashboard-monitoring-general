import { useState } from "react";
import {  Trash2 } from "lucide-react";
import { BaseDialog } from "@/components/common/form-dialog";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Activity } from "@/features/activities/types/activities.types";
import { GanttFeature, GanttFeatureItem } from "@/components/kibo-ui/gantt";
import { ActivityForm } from "@/features/activities/components/activity-form";
import { useDeleteActivity } from "@/features/activities/hooks/use-delete-activity";
import { useUpdateActivity } from "@/features/activities/hooks/use-update-activity";

interface ActivityGanttFeatureProps {
    activity: Activity;
    feature: GanttFeature;
}

export function ActivityGanttFeature({ feature, activity }: ActivityGanttFeatureProps) {
    const updateMutation = useUpdateActivity();
    const deleteMutation = useDeleteActivity();

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        setIsDeleteOpen(true);
    }

    function handleMove(id: string, startDate: Date, endDate: Date | null) {
        if (updateMutation.isPending) return;

        updateMutation.mutate({
        id,
        data: {
            startDate: startDate.toISOString(),
            endDate: endDate?.toISOString(),
        },
        });
    }

    async function handleUpdateSubmit(data: any) {
        await updateMutation.mutateAsync({ id: feature.id, data });
        setIsUpdateOpen(false);
    }

    async function handleDeleteConfirm() {
        await deleteMutation.mutateAsync(feature.id);
        setIsDeleteOpen(false);
    }

    const isDisabled =
        updateMutation.isPending ||
        deleteMutation.isPending;

    return (
        <>
            <GanttFeatureItem
                {...feature}
                onMove={handleMove}
                className={isDisabled ? "opacity-60 cursor-not-allowed" : undefined}
            >
                <p
                    className="flex-1 truncate text-[10px] sm:text-xs"
                    onClick={() => {
                        if (!isDisabled) setIsUpdateOpen(true);
                    }}
                >
                    {feature.name}
                </p>
                <Trash2 className="w-3 h-3"  onClick={handleDelete}/>
            </GanttFeatureItem>

            <BaseDialog
                open={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                title="Update Activity"
                description="Make changes to the activity details."
            >
                <ActivityForm
                    initialData={activity}
                    onSubmit={handleUpdateSubmit}
                    isLoading={updateMutation.isPending}
                />
            </BaseDialog>

            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteMutation.isPending}
                confirmLabel="Delete"
                confirmVariant="destructive"
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the activity."
            />
        </>
    );
}
