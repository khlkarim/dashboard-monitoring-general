import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface EntityPageHeaderProps {
    title: ReactNode;
    description: ReactNode;
    actions: ReactNode;
    collectionName: ReactNode;
    onClickCollectionName: () => void;
}

export function EntityPageHeader({ 
    title, 
    description, 
    actions,
    collectionName,
    onClickCollectionName
} : EntityPageHeaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="cursor-pointer hover:text-foreground transition-colors" onClick={onClickCollectionName}>{collectionName}</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium truncate max-w-[200px]">{title}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground mt-1 text-lg">{description || "No description provided."}</p>
                </div>
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            </div>
        </div>
    );
}