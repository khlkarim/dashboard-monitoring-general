import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Task } from '../../../../domain/task';
import { TaskRepository, MemberStatistics } from '../../task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Sprint } from 'src/sprints/domain/sprint';
import { TaskStatusEnum } from '../../../../domain/task-status.enum';

@Injectable()
export class TaskRelationalRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) { }

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

  async getMemberStatistics(userId: string): Promise<MemberStatistics> {
    // 1. Total tasks assigned to the member
    const totalTasks = await this.taskRepository.count({
      where: { assignee: { id: userId } },
    });

    // 2. Task status distribution
    const statusDistribution = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('task.assigneeId = :userId', { userId })
      .groupBy('task.status')
      .getRawMany();

    const taskStatusDistribution = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    statusDistribution.forEach((row) => {
      // Only count statuses that frontend expects
      if (row.status === 'TODO' || row.status === 'IN_PROGRESS' || row.status === 'DONE') {
        taskStatusDistribution[row.status] = parseInt(row.count);
      }
    });

    // 3. Overdue tasks count
    const overdueTasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.dueDate < :now', { now: new Date() })
      .andWhere('task.status != :done', { done: TaskStatusEnum.DONE })
      .getCount();

    // 4. Completion rate
    const completedTasks = taskStatusDistribution.DONE;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // 5. Completed this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const completedThisMonth = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.status = :done', { done: TaskStatusEnum.DONE })
      .andWhere('task.updatedAt >= :startOfMonth', { startOfMonth })
      .getCount();

    // 6. Average completion time (in days)
    const completedTasksWithDates = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.startDate', 'startDate')
      .addSelect('task.updatedAt', 'completedDate')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.status = :done', { done: TaskStatusEnum.DONE })
      .andWhere('task.startDate IS NOT NULL')
      .getRawMany();

    let averageCompletionTime = 0;
    if (completedTasksWithDates.length > 0) {
      const totalDays = completedTasksWithDates.reduce((sum, task) => {
        const start = new Date(task.startDate);
        const end = new Date(task.completedDate);
        const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0);
      averageCompletionTime = totalDays / completedTasksWithDates.length;
    }

    // 7. On-time completion rate
    const completedTasksWithDueDate = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.dueDate', 'dueDate')
      .addSelect('task.updatedAt', 'completedDate')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('task.status = :done', { done: TaskStatusEnum.DONE })
      .andWhere('task.dueDate IS NOT NULL')
      .getRawMany();

    let onTimeRate = 0;
    if (completedTasksWithDueDate.length > 0) {
      const onTimeCount = completedTasksWithDueDate.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const completedDate = new Date(task.completedDate);
        return completedDate <= dueDate;
      }).length;
      onTimeRate = (onTimeCount / completedTasksWithDueDate.length) * 100;
    }

    // 8. User engagement score (composite metric)
    // Formula: (completionRate * 0.4) + (onTimeRate * 0.4) + (activityScore * 0.2)
    const activityScore = Math.min((completedThisMonth / 5) * 100, 100); // 5 tasks per month = 100%
    const engagementScore = (completionRate * 0.4) + (onTimeRate * 0.4) + (activityScore * 0.2);

    // 9. Skills distribution
    const skillsDistribution = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.assignee', 'user')
      .leftJoin('user.skills', 'skill')
      .select('skill.id', 'skillId')
      .addSelect('skill.title', 'skillTitle')
      .addSelect('COUNT(task.id)', 'taskCount')
      .where('task.assigneeId = :userId', { userId })
      .andWhere('skill.id IS NOT NULL')
      .groupBy('skill.id')
      .addGroupBy('skill.title')
      .orderBy('COUNT(task.id)', 'DESC')
      .getRawMany();

    return {
      totalTasks,
      taskStatusDistribution,
      overdueTasks,
      completionRate: Math.round(completionRate * 100) / 100,
      engagementScore: Math.round(engagementScore * 100) / 100,
      skillsDistribution: skillsDistribution.map((row) => ({
        skillId: row.skillId,
        skillTitle: row.skillTitle || 'Unknown',
        taskCount: parseInt(row.taskCount),
      })),
      averageCompletionTime: Math.round(averageCompletionTime * 100) / 100,
      completedThisMonth,
      onTimeRate: Math.round(onTimeRate * 100) / 100,
    };
  }
}
