import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProcessusEntity } from '../entities/processus.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Processus } from '../../../../domain/processus';
import { ProcessusRepository } from '../../processus.repository';
import { ProcessusMapper } from '../mappers/processus.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProcessusRelationalRepository implements ProcessusRepository {
  constructor(
    @InjectRepository(ProcessusEntity)
    private readonly processusRepository: Repository<ProcessusEntity>,
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
}
