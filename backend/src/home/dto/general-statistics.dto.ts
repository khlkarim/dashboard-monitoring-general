import { ApiProperty } from '@nestjs/swagger';

export class KpiCountByProcessus {
  @ApiProperty({ example: 'processus-id-123' })
  processusId: string;

  @ApiProperty({ example: 'Requirements Gathering' })
  processusLabel: string;

  @ApiProperty({ example: 15 })
  kpiCount: number;
}

export class RiskPriorityItem {
  @ApiProperty({ example: 'high' })
  priority: string;

  @ApiProperty({ example: 5 })
  count: number;
}

export class UnmitigatedRiskItem {
  @ApiProperty({ example: 'risk-id-123' })
  id: string;

  @ApiProperty({ example: 'Data breach vulnerability' })
  title: string;

  @ApiProperty({
    example: 'Critical security vulnerability in authentication system',
  })
  description: string;

  @ApiProperty({ example: 5 })
  detection: number;

  @ApiProperty({ example: 4 })
  occurrence: number;

  @ApiProperty({ example: 5 })
  severity: number;

  @ApiProperty({ example: 100 })
  priorityScore: number;

  @ApiProperty({ example: 'critical' })
  priority: string;
}

export class GeneralStatisticsDto {
  @ApiProperty({ example: 42 })
  totalUsers: number;

  @ApiProperty({ example: 85.5 })
  sprintCompletionRate: number;

  @ApiProperty({ example: 14.2 })
  averageSprintDuration: number;

  @ApiProperty({ example: 23.5 })
  tasksPerSprint: number;

  @ApiProperty({ type: [KpiCountByProcessus] })
  kpiCountByProcessus: KpiCountByProcessus[];

  @ApiProperty({ type: [RiskPriorityItem] })
  riskPriorityMatrix: RiskPriorityItem[];

  @ApiProperty({ type: [UnmitigatedRiskItem] })
  unmitigatedRisks: UnmitigatedRiskItem[];
}
