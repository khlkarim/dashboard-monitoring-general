"use client";

import * as React from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteEntityDialogProps<T> {
    entity: T | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    entityName: string;
    onConfirm: (entity: T) => void | Promise<void>;
    isDeleting?: boolean;
}

export function DeleteEntityDialog<T>({
    open,
    onOpenChange,
    entity,
    entityName,
    onConfirm,
    isDeleting = false,
}: DeleteEntityDialogProps<T>) {
    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (entity) {
            await onConfirm(entity);
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the {entityName}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/80"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
