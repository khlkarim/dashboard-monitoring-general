import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Sprint } from '../../domain/sprint';

export abstract class SprintRepository {
  abstract create(
    data: Omit<Sprint, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Sprint>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Sprint[]>;

  abstract findById(id: Sprint['id']): Promise<NullableType<Sprint>>;

  abstract findByIds(ids: Sprint['id'][]): Promise<Sprint[]>;

  abstract update(
    id: Sprint['id'],
    payload: DeepPartial<Sprint>,
  ): Promise<Sprint | null>;

  abstract remove(id: Sprint['id']): Promise<void>;
}
