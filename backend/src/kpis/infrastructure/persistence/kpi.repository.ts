import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Kpi } from '../../domain/kpi';

export abstract class KpiRepository {
  abstract create(
    data: Omit<Kpi, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Kpi>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Kpi[]>;

  abstract findById(id: Kpi['id']): Promise<NullableType<Kpi>>;

  abstract findByIds(ids: Kpi['id'][]): Promise<Kpi[]>;

  abstract update(
    id: Kpi['id'],
    payload: DeepPartial<Kpi>,
  ): Promise<Kpi | null>;

  abstract remove(id: Kpi['id']): Promise<void>;
}
