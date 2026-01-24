import { Skeleton } from "../ui/skeleton";

export function LoadingPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Skeleton className="h-32 col-span-1" />
                <Skeleton className="h-32 col-span-1" />
                <Skeleton className="h-32 col-span-1" />
                <Skeleton className="h-32 col-span-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Skeleton className="col-span-8 h-[400px]" />
                <Skeleton className="col-span-4 h-[400px]" />
            </div>
        </div>
    );
}