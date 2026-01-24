import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatCardProps {
    title: ReactNode;
    value?: ReactNode;
    icon?: ReactNode;
    description?: ReactNode;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
}

export function StatCard({
    title,
    value,
    icon,
    description,
    className,
    headerClassName,
    contentClassName,
}: StatCardProps) {
    return (
        <Card className={className}>
            <CardHeader
                className={cn(
                    "flex flex-row items-center justify-between space-y-0 pb-2",
                    headerClassName
                )}
            >
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && (
                    <div className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                        {icon}
                    </div>
                )}
            </CardHeader>

            <CardContent className={contentClassName}>
                <div className="text-2xl font-bold">
                    {value ?? "--"}
                </div>

                {description && (
                    <div className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
