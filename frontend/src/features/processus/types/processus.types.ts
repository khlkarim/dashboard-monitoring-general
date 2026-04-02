import type { ProcessusResponse } from "../schemas/processus.schemas";

export type Processus = ProcessusResponse;

export interface TaskCriticalityDistribution {
  critical1: number;
  critical2: number;
  critical3: number;
  critical4: number;
  critical5: number;
  noCriticality: number;
}

export interface KpiWithGraph {
  id: string;
  name: string;
  description?: string | null;
  samples?: number[] | null;
  samplingRate?: string | null;
}

export interface ProcessusStatistics {
  totalUsers: number;
  totalKpis: number;
  kpisWithGraphs: KpiWithGraph[];
  totalActivities: number;
  taskCriticalityDistribution: TaskCriticalityDistribution;
}
