import { Badge } from "@/components/ui/badge";
import { Kpi } from "@/features/kpis/types/kpis.types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface KpiInfoProps {
    kpi: Kpi;
}

export function KpiInfo({ kpi } : KpiInfoProps) {
    return (
        <div className="lg:col-span-4 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">ID</span>
                        <code className="text-xs bg-muted p-1 rounded block truncate max-w-[150px]">{kpi.id}</code>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {kpi.createdBy ? `${kpi.createdBy.firstName} ${kpi.createdBy.lastName}` : "Unknown"}
                        </span>
                    </div>
                    {kpi.sprint && (
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Sprint</span>
                            <Badge variant="outline">{kpi.sprint.name}</Badge>
                        </div>
                    )}
                    {kpi.processus && (
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Processus</span>
                            <Badge variant="outline">{kpi.processus.label}</Badge>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}