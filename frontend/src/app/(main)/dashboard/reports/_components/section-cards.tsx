import { Progress } from "@/components/ui/progress";
import { Package, CheckCircle2, AlertTriangle, Target } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SectionCardsProps {
  data: {
    sprints: any[];
    tasks: any[];
    risks: any[];
    kpis: any[];
  };
}

export function SectionCards({ data }: SectionCardsProps) {
  const completedTasks = data.tasks.filter(t => t.status === "DONE").length;
  const taskCompletionRate = data.tasks.length > 0 ? Math.round((completedTasks / data.tasks.length) * 100) : 0;

  const highSeverityRisks = data.risks.filter(r => (r.severity || 0) >= 4).length;
  const activeSprints = data.sprints.filter(s => s.status === "ACTIVE").length;

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground">Active Sprints</CardDescription>
            <Package className="size-4 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {activeSprints}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Out of {data.sprints.length} total sprints</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground">Task Completion</CardDescription>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {taskCompletionRate}%
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={taskCompletionRate} className="h-1.5" />
          <p className="text-xs text-muted-foreground">{completedTasks} of {data.tasks.length} tasks done</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground">Critical Risks</CardDescription>
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {highSeverityRisks}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Severity Level ≥ 4</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground">Active KPIs</CardDescription>
            <Target className="size-4 text-orange-500" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {data.kpis.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Monitoring key metrics</p>
        </CardContent>
      </Card>
    </div>
  );
}
