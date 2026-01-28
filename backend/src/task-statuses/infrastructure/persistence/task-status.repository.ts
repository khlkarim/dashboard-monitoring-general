import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TaskStatus } from '../../domain/task-status';

export abstract class TaskStatusRepository {
  abstract create(
    data: Omit<TaskStatus, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TaskStatus>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TaskStatus[]>;

  abstract findById(id: TaskStatus['id']): Promise<NullableType<TaskStatus>>;

  abstract findByIds(ids: TaskStatus['id'][]): Promise<TaskStatus[]>;

  abstract update(
    id: TaskStatus['id'],
    payload: DeepPartial<TaskStatus>,
  ): Promise<TaskStatus | null>;

  abstract remove(id: TaskStatus['id']): Promise<void>;
}
