import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SprintEntity } from '../entities/sprint.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Sprint } from '../../../../domain/sprint';
import { SprintRepository } from '../../sprint.repository';
import { SprintMapper } from '../mappers/sprint.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SprintRelationalRepository implements SprintRepository {
  constructor(
    @InjectRepository(SprintEntity)
    private readonly sprintRepository: Repository<SprintEntity>,
  ) {}

  async create(data: Sprint): Promise<Sprint> {
    const persistenceModel = SprintMapper.toPersistence(data);
    const newEntity = await this.sprintRepository.save(
      this.sprintRepository.create(persistenceModel),
    );
    return SprintMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Sprint[]> {
    const entities = await this.sprintRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SprintMapper.toDomain(entity));
  }

  async findById(id: Sprint['id']): Promise<NullableType<Sprint>> {
    const entity = await this.sprintRepository.findOne({
      where: { id },
    });

    return entity ? SprintMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Sprint['id'][]): Promise<Sprint[]> {
    const entities = await this.sprintRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SprintMapper.toDomain(entity));
  }

  async update(id: Sprint['id'], payload: Partial<Sprint>): Promise<Sprint> {
    const entity = await this.sprintRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.sprintRepository.save(
      this.sprintRepository.create(
        SprintMapper.toPersistence({
          ...SprintMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SprintMapper.toDomain(updatedEntity);
  }

  async remove(id: Sprint['id']): Promise<void> {
    await this.sprintRepository.delete(id);
  }
}
