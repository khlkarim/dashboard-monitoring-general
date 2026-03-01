import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { UserRepository } from '../users/infrastructure/persistence/user.repository';
import { SprintRepository } from '../sprints/infrastructure/persistence/sprint.repository';
import { TaskRepository } from '../tasks/infrastructure/persistence/task.repository';
import { KpiRepository } from '../kpis/infrastructure/persistence/kpi.repository';
import { RiskRepository } from '../risks/infrastructure/persistence/risk.repository';
import { ProcessusRepository } from '../processus/infrastructure/persistence/processus.repository';
import {
  GeneralStatisticsDto,
  KpiCountByProcessus,
  RiskPriorityItem,
  UnmitigatedRiskItem,
} from './dto/general-statistics.dto';
import { SprintStatus } from '../sprints/domain/sprint-status.enum';

@Injectable()
export class HomeService {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private userRepository: UserRepository,
    private sprintRepository: SprintRepository,
    private taskRepository: TaskRepository,
    private kpiRepository: KpiRepository,
    private riskRepository: RiskRepository,
    private processusRepository: ProcessusRepository,
  ) {}

  appInfo() {
    return { name: this.configService.get('app.name', { infer: true }) };
  }

  async getGeneralStatistics(): Promise<GeneralStatisticsDto> {
    // Get all data
    const users = await this.userRepository.findManyWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    const sprints = await this.sprintRepository.findAllWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    const tasks = await this.taskRepository.findAllWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    const kpis = await this.kpiRepository.findAllWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    const risks = await this.riskRepository.findAllWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    const processus = await this.processusRepository.findAllWithPagination({
      paginationOptions: { page: 1, limit: 10000 },
    });

    // Calculate total users
    const totalUsers = users.length;

    // Calculate sprint completion rate
    const completedSprints = sprints.filter(
      (s) => s.status === SprintStatus.COMPLETED,
    ).length;
    const sprintCompletionRate =
      sprints.length > 0
        ? parseFloat(((completedSprints / sprints.length) * 100).toFixed(2))
        : 0;

    // Calculate average sprint duration (in days)
    const sprintDurations = sprints.map((sprint) => {
      const start = new Date(sprint.startDate);
      const end = new Date(sprint.endDate);
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    });
    const averageSprintDuration =
      sprintDurations.length > 0
        ? parseFloat(
            (
              sprintDurations.reduce((a, b) => a + b, 0) /
              sprintDurations.length
            ).toFixed(2),
          )
        : 0;

    // Calculate tasks per sprint (average)
    const tasksPerSprint =
      sprints.length > 0
        ? parseFloat((tasks.length / sprints.length).toFixed(2))
        : 0;

    // Calculate KPIs count by processus
    const kpiCountByProcessus: KpiCountByProcessus[] = processus
      .map((proc) => {
        const kpiCount = kpis.filter((k) => k.processus?.id === proc.id).length;
        return {
          processusId: proc.id,
          processusLabel: proc.label || 'Unknown',
          kpiCount,
        };
      })
      .filter((item) => item.kpiCount > 0);

    // Calculate risk priority matrix
    const riskPriorityMap: Map<string, number> = new Map();
    risks.forEach((risk) => {
      // Calculate priority based on detection, occurrence, and severity
      const detection = risk.detection || 0;
      const occurrence = risk.occurrence || 0;
      const severity = risk.severity || 0;
      const priorityScore = detection * occurrence * severity;

      let priority = 'low';
      if (priorityScore >= 125) {
        priority = 'critical';
      } else if (priorityScore >= 64) {
        priority = 'high';
      } else if (priorityScore >= 27) {
        priority = 'medium';
      }

      riskPriorityMap.set(priority, (riskPriorityMap.get(priority) || 0) + 1);
    });

    const riskPriorityMatrix: RiskPriorityItem[] = Array.from(
      riskPriorityMap.entries(),
    ).map(([priority, count]) => ({ priority, count }));

    // Get unmitigated risks (risks without actions)
    const unmitigatedRisksData = risks.filter(
      (risk) => !risk.actions || risk.actions.length === 0,
    );
    const unmitigatedRisks: UnmitigatedRiskItem[] = unmitigatedRisksData.map(
      (risk) => {
        const detection = risk.detection || 0;
        const occurrence = risk.occurrence || 0;
        const severity = risk.severity || 0;
        const priorityScore = detection * occurrence * severity;

        let priority = 'low';
        if (priorityScore >= 125) {
          priority = 'critical';
        } else if (priorityScore >= 64) {
          priority = 'high';
        } else if (priorityScore >= 27) {
          priority = 'medium';
        }

        return {
          id: risk.id,
          title: risk.title || 'Untitled Risk',
          description: risk.description || 'No description',
          detection,
          occurrence,
          severity,
          priorityScore,
          priority,
        };
      },
    );

    return {
      totalUsers,
      sprintCompletionRate,
      averageSprintDuration,
      tasksPerSprint,
      kpiCountByProcessus,
      riskPriorityMatrix,
      unmitigatedRisks,
    };
  }
}
