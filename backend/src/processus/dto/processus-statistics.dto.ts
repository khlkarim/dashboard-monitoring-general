import { ApiProperty } from '@nestjs/swagger';

export class TaskCriticalityDistribution {
  @ApiProperty()
  critical1: number;

  @ApiProperty()
  critical2: number;

  @ApiProperty()
  critical3: number;

  @ApiProperty()
  critical4: number;

  @ApiProperty()
  critical5: number;

  @ApiProperty()
  noCriticality: number;
}

export class KpiWithGraph {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description?: string | null;

  @ApiProperty({ nullable: true, type: [Number] })
  samples?: number[] | null;

  @ApiProperty({ nullable: true })
  samplingRate?: string | null;
}

export class ProcessusStatisticsDto {
  @ApiProperty({ description: 'Total number of users linked to the processus' })
  totalUsers: number;

  @ApiProperty({ description: 'Number of KPIs in the processus' })
  totalKpis: number;

  @ApiProperty({
    description: 'KPIs with their graph data',
    type: [KpiWithGraph],
  })
  kpisWithGraphs: KpiWithGraph[];

  @ApiProperty({ description: 'Number of activities in the processus' })
  totalActivities: number;

  @ApiProperty({
    description: 'Distribution of tasks by criticality',
    type: TaskCriticalityDistribution,
  })
  taskCriticalityDistribution: TaskCriticalityDistribution;
}
