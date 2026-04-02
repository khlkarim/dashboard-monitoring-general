import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Task } from '../../../../domain/task';
import {
  TaskRepository,
  TaskStatusCount,
  TaskDateInfo,
} from '../../task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Sprint } from 'src/sprints/domain/sprint';
import { TaskStatusEnum } from '../../../../domain/task-status.enum';

@Injectable()
export class TaskRelationalRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(data: Task): Promise<Task> {
    const persistenceModel = TaskMapper.toPersistence(data);
    const newEntity = await this.taskRepository.save(
      this.taskRepository.create(persistenceModel),
    );
    return TaskMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]> {
    const entities = await this.taskRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TaskMapper.toDomain(entity));
  }

  async findAllBySprintIdWithPagination({
    paginationOptions,
    sprintId,
  }: {
    paginationOptions: IPaginationOptions;
    sprintId: Sprint['id'];
  }): Promise<Task[]> {
    const entities = await this.taskRepository.find({
      where: { sprint: { id: sprintId } },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TaskMapper.toDomain(entity));
  }

  async findById(id: Task['id']): Promise<NullableType<Task>> {
    const entity = await this.taskRepository.findOne({
      where: { id },
    });

    return entity ? TaskMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Task['id'][]): Promise<Task[]> {
    const entities = await this.taskRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TaskMapper.toDomain(entity));
  }

  async update(id: Task['id'], payload: Partial<Task>): Promise<Task> {
    const entity = await this.taskRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    await this.taskRepository.save(
      this.taskRepository.create(
        TaskMapper.toPersistence({
          ...TaskMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    const reloadedEntity = await this.taskRepository.findOne({
      where: { id },
    });
    if (!reloadedEntity) {
      throw new Error('Record not found');
    }
    return TaskMapper.toDomain(reloadedEntity);
  }

  async remove(id: Task['id']): Promise<void> {
    await this.taskRepository.delete(id);
  }

  // Simple data queries - no business logic
  async getTaskCountByUser(userId: string): Promise<number> {
    return this.taskRepository.count({
      where: { assignee: { id: userId } },
    });
  }

  async getTaskStatusCountsByUser(userId: string): Promise<TaskStatusCount[]> {
    const results = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('task.assigneeId = :userId', { userId })
      .groupBy('task.status')
      .getRawMany();

    return results.map((row) => ({
      status: row.status,
      count: parseInt(row.count),
    }));
  }

  async getOverdueTasksCountByUser(userId: string): Promise<number> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.dueDate < :now', { now: new Date() })
      .andWhere('task.status != :done', { done: TaskStatusEnum.DONE })
      .getCount();
  }

  async getCompletedTasksCountByUserAfterDate(
    userId: string,
    startDate: Date,
  ): Promise<number> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.status = :done', { done: TaskStatusEnum.DONE })
      .andWhere('task.updatedAt >= :startDate', { startDate })
      .getCount();
  }

  async getCompletedTasksWithDatesByUser(
    userId: string,
  ): Promise<TaskDateInfo[]> {
    const results = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.startDate', 'startDate')
      .addSelect('task.updatedAt', 'completedDate')
      .addSelect('task.dueDate', 'dueDate')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.status = :done', { done: TaskStatusEnum.DONE })
      .andWhere('task.startDate IS NOT NULL')
      .getRawMany();

    return results.map((row) => ({
      startDate: new Date(row.startDate),
      completedDate: new Date(row.completedDate),
      dueDate: row.dueDate ? new Date(row.dueDate) : undefined,
    }));
  }
}
