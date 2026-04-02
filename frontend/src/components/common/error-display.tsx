import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorDisplayProps {
    error?: unknown;
    title?: string;
    retry?: () => void;
}

export function ErrorDisplay({ error, title = "Error", retry }: ErrorDisplayProps) {
    const errorMessage =
        error instanceof Error ? error.message :
            typeof error === 'string' ? error :
                "An unexpected error occurred.";

    return (
        <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="mt-2 flex flex-col gap-2">
                <p>{errorMessage}</p>
                {retry && (
                    <Button variant="outline" size="sm" onClick={retry} className="w-fit">
                        Retry
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    );
}
