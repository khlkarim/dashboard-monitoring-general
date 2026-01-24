import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Risk } from "@/features/risks/types/risks.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskInfoProps {
    risk: Risk;
}

export function RiskInfo({ risk } : RiskInfoProps) {
    return (
        <div className="lg:col-span-4 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Risk Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">Created</span>
                        <span className="text-sm font-medium">{format(new Date(risk.createdAt), "PP")}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">Last Updated</span>
                        <span className="text-sm font-medium">{format(new Date(risk.updatedAt), "PP")}</span>
                    </div>
                    <div className="pt-2">
                        <span className="text-sm text-muted-foreground block mb-2">ID</span>
                        <code className="text-xs bg-muted p-1 rounded block truncate">{risk.id}</code>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
