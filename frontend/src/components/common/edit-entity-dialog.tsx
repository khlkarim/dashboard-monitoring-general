"use client";

import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface EditEntityDialogProps<T> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    entity: T | null;
    title: string;
    description?: string;
    children: (props: { entity: T; setOpen: (open: boolean) => void }) => React.ReactNode;
}

export function EditEntityDialog<T>({
    open,
    onOpenChange,
    entity,
    title,
    description,
    children,
}: EditEntityDialogProps<T>) {
    if (!entity && open) {
        // Safety check, though parent should handle this
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {entity && children({ entity, setOpen: onOpenChange })}
            </DialogContent>
        </Dialog>
    );
}
