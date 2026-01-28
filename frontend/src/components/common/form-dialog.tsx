"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface BaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title?: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;

    contentClassName?: string;
    headerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    bodyClassName?: string;

    contentProps?: React.ComponentPropsWithoutRef<typeof DialogContent>;
}

export function BaseDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    bodyClassName,
    contentProps,
}: BaseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                {...contentProps}
                className={cn(contentClassName, contentProps?.className)}
            >
                {(title || description) && (
                    <DialogHeader className={headerClassName}>
                        {title && (
                            <DialogTitle className={titleClassName}>
                                {title}
                            </DialogTitle>
                        )}
                        {description && (
                            <DialogDescription className={descriptionClassName}>
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}

                <div className={bodyClassName}>{children}</div>
            </DialogContent>
        </Dialog>
    );
}
