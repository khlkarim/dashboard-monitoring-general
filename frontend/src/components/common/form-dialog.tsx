"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface BaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title?: React.ReactNode;
    description?: React.ReactNode;

    children: React.ReactNode;
}

export function BaseDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
}: BaseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {(title || description) && (
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && (
                    <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                )}

                {children}
            </DialogContent>
        </Dialog>
    );
}
