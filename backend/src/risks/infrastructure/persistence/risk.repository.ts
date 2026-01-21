import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Risk } from '../../domain/risk';

export abstract class RiskRepository {
  abstract create(
    data: Omit<Risk, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Risk>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Risk[]>;

  abstract findById(id: Risk['id']): Promise<NullableType<Risk>>;

  abstract findByIds(ids: Risk['id'][]): Promise<Risk[]>;

  abstract update(
    id: Risk['id'],
    payload: DeepPartial<Risk>,
  ): Promise<Risk | null>;

  abstract remove(id: Risk['id']): Promise<void>;
}
