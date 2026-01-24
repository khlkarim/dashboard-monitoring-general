"use client";

import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

interface TableCardProps {
    title: ReactNode;
    description: ReactNode;
    actions: ReactNode;
    children: ReactNode;
}

export function TableCard({
    title,
    description,
    actions,
    children
}: TableCardProps) {
    return (
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {actions}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex size-full flex-col gap-4">
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}
