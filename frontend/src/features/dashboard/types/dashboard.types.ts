export interface KpiCountByProcessus {
  processusId: string;
  processusLabel: string;
  kpiCount: number;
}

export interface RiskPriorityItem {
  priority: string;
  count: number;
}

export interface UnmitigatedRiskItem {
  id: string;
  title: string;
  description: string;
  detection: number;
  occurrence: number;
  severity: number;
  priorityScore: number;
  priority: string;
}

export interface GeneralStatistics {
  totalUsers: number;
  sprintCompletionRate: number;
  averageSprintDuration: number;
  tasksPerSprint: number;
  kpiCountByProcessus: KpiCountByProcessus[];
  riskPriorityMatrix: RiskPriorityItem[];
  unmitigatedRisks: UnmitigatedRiskItem[];
}
