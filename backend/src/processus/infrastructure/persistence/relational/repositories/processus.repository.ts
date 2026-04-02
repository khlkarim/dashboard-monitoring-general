import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProcessusEntity } from '../entities/processus.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Processus } from '../../../../domain/processus';
import {
  ProcessusRepository,
  TaskCriticalityCount,
} from '../../processus.repository';
import { ProcessusMapper } from '../mappers/processus.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { KpiEntity } from '../../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { ActivityEntity } from '../../../../../activities/infrastructure/persistence/relational/entities/activity.entity';
import { TaskEntity } from '../../../../../tasks/infrastructure/persistence/relational/entities/task.entity';

@Injectable()
export class ProcessusRelationalRepository implements ProcessusRepository {
  constructor(
    @InjectRepository(ProcessusEntity)
    private readonly processusRepository: Repository<ProcessusEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(KpiEntity)
    private readonly kpiRepository: Repository<KpiEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(data: Processus): Promise<Processus> {
    const persistenceModel = ProcessusMapper.toPersistence(data);
    const newEntity = await this.processusRepository.save(
      this.processusRepository.create(persistenceModel),
    );
    return ProcessusMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Processus[]> {
    const entities = await this.processusRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProcessusMapper.toDomain(entity));
  }

  async findById(id: Processus['id']): Promise<NullableType<Processus>> {
    const entity = await this.processusRepository.findOne({
      where: { id },
    });

    return entity ? ProcessusMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Processus['id'][]): Promise<Processus[]> {
    const entities = await this.processusRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProcessusMapper.toDomain(entity));
  }

  async update(
    id: Processus['id'],
    payload: Partial<Processus>,
  ): Promise<Processus> {
    const entity = await this.processusRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.processusRepository.save(
      this.processusRepository.create(
        ProcessusMapper.toPersistence({
          ...ProcessusMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProcessusMapper.toDomain(updatedEntity);
  }

  async remove(id: Processus['id']): Promise<void> {
    await this.processusRepository.delete(id);
  }

  // Simple data queries - no business logic
  async getUserCountByProcessus(processusId: string): Promise<number> {
    return this.userRepository.count({
      where: { processus: { id: processusId } },
    });
  }

  async getKpiCountByProcessus(processusId: string): Promise<number> {
    return this.kpiRepository.count({
      where: { processus: { id: processusId } },
    });
  }

  async getActivityCountByProcessus(processusId: string): Promise<number> {
    return this.activityRepository.count({
      where: { processus: { id: processusId } },
    });
  }

  async getTaskCriticalityCountsByProcessus(
    processusId: string,
  ): Promise<TaskCriticalityCount[]> {
    // Single query with JOIN - cleaner data access, no orchestration
    const results = await this.taskRepository
      .createQueryBuilder('task')
      .innerJoin('task.assignee', 'user')
      .innerJoin('user.processus', 'processus')
      .select('task.criticality', 'criticality')
      .addSelect('COUNT(*)', 'count')
      .where('processus.id = :processusId', { processusId })
      .groupBy('task.criticality')
      .getRawMany();

    return results.map((row) => ({
      criticality: row.criticality !== null ? parseInt(row.criticality) : null,
      count: parseInt(row.count),
    }));
  }
}
