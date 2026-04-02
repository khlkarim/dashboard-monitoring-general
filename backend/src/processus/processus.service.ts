import {
  // common
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcessusDto } from './dto/create-processus.dto';
import { UpdateProcessusDto } from './dto/update-processus.dto';
import { ProcessusRepository } from './infrastructure/persistence/processus.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Processus } from './domain/processus';
import {
  ProcessusStatisticsDto,
  TaskCriticalityDistribution,
  KpiWithGraph,
} from './dto/processus-statistics.dto';
import { KpiRepository } from '../kpis/infrastructure/persistence/kpi.repository';

@Injectable()
export class ProcessusService {
  constructor(
    // Dependencies here
    private readonly processusRepository: ProcessusRepository,
    private readonly kpiRepository: KpiRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createProcessusDto: CreateProcessusDto,
  ) {
    // Do not remove comment below.
    // <creating-property />
    return this.processusRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createProcessusDto.description,

      label: createProcessusDto.label,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.processusRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Processus['id']) {
    return this.processusRepository.findById(id);
  }

  findByIds(ids: Processus['id'][]) {
    return this.processusRepository.findByIds(ids);
  }

  async update(
    id: Processus['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateProcessusDto: UpdateProcessusDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.processusRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateProcessusDto.description,

      label: updateProcessusDto.label,
    });
  }

  remove(id: Processus['id']) {
    return this.processusRepository.remove(id);
  }

  /**
   * Get comprehensive statistics for a processus
   * Contains all business logic for calculating metrics
   */
  async getProcessusStatistics(
    processusId: string,
  ): Promise<ProcessusStatisticsDto> {
    // Verify processus exists
    const processus = await this.findById(processusId);
    if (!processus) {
      throw new NotFoundException('Processus not found');
    }

    // 1. Get raw data from repository (simple queries)
    const totalUsers =
      await this.processusRepository.getUserCountByProcessus(processusId);
    const totalKpis =
      await this.processusRepository.getKpiCountByProcessus(processusId);
    const totalActivities =
      await this.processusRepository.getActivityCountByProcessus(processusId);
    const criticalityCounts =
      await this.processusRepository.getTaskCriticalityCountsByProcessus(
        processusId,
      );

    // 2. Get KPIs with their graph data
    const kpis = await this.kpiRepository.findAllByProcessusIdWithPagination({
      paginationOptions: {
        page: 1,
        limit: 100, // Get all KPIs for the processus
      },
      processusId,
    });

    // 3. BUSINESS LOGIC: Map KPIs to the format needed for graphs
    const kpisWithGraphs: KpiWithGraph[] = kpis.map((kpi) => ({
      id: kpi.id,
      name: kpi.name,
      description: kpi.description,
      samples: kpi.samples,
      samplingRate: kpi.samplingRate,
    }));

    // 4. BUSINESS LOGIC: Build task criticality distribution
    const taskCriticalityDistribution: TaskCriticalityDistribution = {
      critical1: 0,
      critical2: 0,
      critical3: 0,
      critical4: 0,
      critical5: 0,
      noCriticality: 0,
    };

    criticalityCounts.forEach((row) => {
      if (row.criticality === null) {
        taskCriticalityDistribution.noCriticality = row.count;
      } else if (row.criticality === 1) {
        taskCriticalityDistribution.critical1 = row.count;
      } else if (row.criticality === 2) {
        taskCriticalityDistribution.critical2 = row.count;
      } else if (row.criticality === 3) {
        taskCriticalityDistribution.critical3 = row.count;
      } else if (row.criticality === 4) {
        taskCriticalityDistribution.critical4 = row.count;
      } else if (row.criticality === 5) {
        taskCriticalityDistribution.critical5 = row.count;
      }
    });

    // Return calculated statistics
    return {
      totalUsers,
      totalKpis,
      kpisWithGraphs,
      totalActivities,
      taskCriticalityDistribution,
    };
  }
}
