import { Sprint } from 'src/sprints/domain/sprint';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Task } from '../../domain/task';

export interface TaskStatusDistribution {
  TODO: number;
  IN_PROGRESS: number;
  DONE: number;
}

export interface MemberStatistics {
  totalTasks: number;
  taskStatusDistribution: TaskStatusDistribution;
  overdueTasks: number;
  completionRate: number;
  engagementScore: number;
  skillsDistribution: Array<{ skillId: string; skillTitle: string; taskCount: number }>;
  averageCompletionTime: number;
  completedThisMonth: number;
  onTimeRate: number;
}

export abstract class TaskRepository {
  abstract create(
    data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Task>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]>;

  abstract findAllBySprintIdWithPagination({
    paginationOptions,
    sprintId,
  }: {
    paginationOptions: IPaginationOptions;
    sprintId: Sprint['id'];
  }): Promise<Task[]>;

  abstract findById(id: Task['id']): Promise<NullableType<Task>>;

  abstract findByIds(ids: Task['id'][]): Promise<Task[]>;

  abstract update(
    id: Task['id'],
    payload: DeepPartial<Task>,
  ): Promise<Task | null>;

  abstract remove(id: Task['id']): Promise<void>;

  abstract getMemberStatistics(userId: string): Promise<MemberStatistics>;
}
