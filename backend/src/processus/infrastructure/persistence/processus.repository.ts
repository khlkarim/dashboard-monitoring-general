import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Processus } from '../../domain/processus';

export abstract class ProcessusRepository {
  abstract create(
    data: Omit<Processus, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Processus>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Processus[]>;

  abstract findById(id: Processus['id']): Promise<NullableType<Processus>>;

  abstract findByIds(ids: Processus['id'][]): Promise<Processus[]>;

  abstract update(
    id: Processus['id'],
    payload: DeepPartial<Processus>,
  ): Promise<Processus | null>;

  abstract remove(id: Processus['id']): Promise<void>;
}
