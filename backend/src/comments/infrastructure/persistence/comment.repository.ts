import { Task } from 'src/tasks/domain/task';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Comment } from '../../domain/comment';

export abstract class CommentRepository {
  abstract create(
    data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Comment>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Comment[]>;

  abstract findAllByTaskIdWithPagination({
    paginationOptions,
    taskId,
  }: {
    paginationOptions: IPaginationOptions;
    taskId: Task['id'];
  }): Promise<Comment[]>;

  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;

  abstract findByIds(ids: Comment['id'][]): Promise<Comment[]>;

  abstract update(
    id: Comment['id'],
    payload: DeepPartial<Comment>,
  ): Promise<Comment | null>;

  abstract remove(id: Comment['id']): Promise<void>;

  // Simple data query for member statistics
  abstract getCommentCountByUser(userId: string): Promise<number>;
  
  abstract getCommentCountByUserAfterDate(userId: string, startDate: Date): Promise<number>;
}
