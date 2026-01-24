import { ReactNode } from "react";

interface HeaderProps {
    title: ReactNode;
    description: ReactNode;
}

export function Header({ title, description }: HeaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground text-lg">
                {description}
            </p>
        </div>
    );
}