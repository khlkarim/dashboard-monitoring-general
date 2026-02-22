import { Sprint } from 'src/sprints/domain/sprint';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Task } from '../../domain/task';

// Raw data interfaces returned by repository
export interface TaskStatusCount {
  status: string;
  count: number;
}

export interface TaskDateInfo {
  startDate: Date;
  completedDate: Date;
  dueDate?: Date;
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

  // Simple data queries for member statistics (no business logic)
  abstract getTaskCountByUser(userId: string): Promise<number>;
  
  abstract getTaskStatusCountsByUser(userId: string): Promise<TaskStatusCount[]>;
  
  abstract getOverdueTasksCountByUser(userId: string): Promise<number>;
  
  abstract getCompletedTasksCountByUserAfterDate(userId: string, startDate: Date): Promise<number>;
  
  abstract getCompletedTasksWithDatesByUser(userId: string): Promise<TaskDateInfo[]>;
}
