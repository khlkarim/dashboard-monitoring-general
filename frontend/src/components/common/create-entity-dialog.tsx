"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CreateEntityDialogProps {
    title: string;
    description?: string;
    buttonLabel?: string;
    children: (props: { setOpen: (open: boolean) => void }) => React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateEntityDialog({
    title,
    description,
    buttonLabel = "Create",
    children,
    open,
    onOpenChange,
}: CreateEntityDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children({ setOpen: onOpenChange })}
            </DialogContent>
        </Dialog>
    );
}
