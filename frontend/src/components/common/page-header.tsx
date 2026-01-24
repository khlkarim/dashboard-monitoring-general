import { ReactNode } from "react";

interface BreadcrumbItem {
    label: ReactNode;
    onClick?: () => void;
}

export interface PageHeaderProps {
    title: ReactNode;
    description?: ReactNode;

    actions?: ReactNode;

    breadcrumbs?: BreadcrumbItem[];

    maxTitleWidth?: number | string;
}

export function PageHeader({
    title,
    description,
    actions,
    breadcrumbs,
    maxTitleWidth = 400,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-2">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                        <span
                            className={
                            item.onClick
                                ? "cursor-pointer hover:text-foreground transition-colors"
                                : "text-foreground font-medium truncate max-w-[200px]"
                            }
                            onClick={item.onClick}
                        >
                            {item.label}
                        </span>

                        {index < breadcrumbs.length - 1 && (
                            <span className="text-muted-foreground">/</span>
                        )}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1
                        className="text-3xl font-bold tracking-tight truncate"
                        style={{ maxWidth: maxTitleWidth }}
                    >
                        {title}
                    </h1>

                    {description && (
                        <p className="text-muted-foreground mt-1 text-lg">
                        {description}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
