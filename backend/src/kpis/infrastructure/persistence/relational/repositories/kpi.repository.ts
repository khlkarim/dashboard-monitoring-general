import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { KpiEntity } from '../entities/kpi.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Kpi } from '../../../../domain/kpi';
import { KpiRepository } from '../../kpi.repository';
import { KpiMapper } from '../mappers/kpi.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Processus } from 'src/processus/domain/processus';
import { Sprint } from 'src/sprints/domain/sprint';

@Injectable()
export class KpiRelationalRepository implements KpiRepository {
  constructor(
    @InjectRepository(KpiEntity)
    private readonly kpiRepository: Repository<KpiEntity>,
  ) { }

  async create(data: Kpi): Promise<Kpi> {
    const persistenceModel = KpiMapper.toPersistence(data);
    const newEntity = await this.kpiRepository.save(
      this.kpiRepository.create(persistenceModel),
    );
    return KpiMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Kpi[]> {
    const entities = await this.kpiRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => KpiMapper.toDomain(entity));
  }

  async findAllBySprintIdWithPagination({
    paginationOptions,
    sprintId,
  }: {
    paginationOptions: IPaginationOptions;
    sprintId: Sprint['id'];
  }): Promise<Kpi[]> {
    const entities = await this.kpiRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: { sprint: { id: sprintId } },
    });

    return entities.map((entity) => KpiMapper.toDomain(entity));
  }

  async findAllByProcessusIdWithPagination({
    paginationOptions,
    processusId,
  }: {
    paginationOptions: IPaginationOptions;
    processusId: Processus['id'];
  }): Promise<Kpi[]> {
    const entities = await this.kpiRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: { processus: { id: processusId } },
    });

    return entities.map((entity) => KpiMapper.toDomain(entity));
  }

  async findById(id: Kpi['id']): Promise<NullableType<Kpi>> {
    const entity = await this.kpiRepository.findOne({
      where: { id },
    });

    return entity ? KpiMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Kpi['id'][]): Promise<Kpi[]> {
    const entities = await this.kpiRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => KpiMapper.toDomain(entity));
  }

  async update(id: Kpi['id'], payload: Partial<Kpi>): Promise<Kpi> {
    const entity = await this.kpiRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    await this.kpiRepository.save(
      this.kpiRepository.create(
        KpiMapper.toPersistence({
          ...KpiMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    const updatedEntity = await this.kpiRepository.findOne({
      where: { id },
    });

    if (!updatedEntity) {
      throw new Error('Record not found');
    }

    return KpiMapper.toDomain(updatedEntity);
  }

  async remove(id: Kpi['id']): Promise<void> {
    await this.kpiRepository.delete(id);
  }
}
