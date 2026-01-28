import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TaskStatus } from '../../../../domain/task-status';
import { TaskStatusRepository } from '../../task-status.repository';
import { TaskStatusMapper } from '../mappers/task-status.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TaskStatusRelationalRepository implements TaskStatusRepository {
  constructor(
    @InjectRepository(TaskStatusEntity)
    private readonly taskStatusRepository: Repository<TaskStatusEntity>,
  ) {}

  async create(data: TaskStatus): Promise<TaskStatus> {
    const persistenceModel = TaskStatusMapper.toPersistence(data);
    const newEntity = await this.taskStatusRepository.save(
      this.taskStatusRepository.create(persistenceModel),
    );
    return TaskStatusMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TaskStatus[]> {
    const entities = await this.taskStatusRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TaskStatusMapper.toDomain(entity));
  }

  async findById(id: TaskStatus['id']): Promise<NullableType<TaskStatus>> {
    const entity = await this.taskStatusRepository.findOne({
      where: { id },
    });

    return entity ? TaskStatusMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TaskStatus['id'][]): Promise<TaskStatus[]> {
    const entities = await this.taskStatusRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TaskStatusMapper.toDomain(entity));
  }

  async update(
    id: TaskStatus['id'],
    payload: Partial<TaskStatus>,
  ): Promise<TaskStatus> {
    const entity = await this.taskStatusRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.taskStatusRepository.save(
      this.taskStatusRepository.create(
        TaskStatusMapper.toPersistence({
          ...TaskStatusMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TaskStatusMapper.toDomain(updatedEntity);
  }

  async remove(id: TaskStatus['id']): Promise<void> {
    await this.taskStatusRepository.delete(id);
  }
}
