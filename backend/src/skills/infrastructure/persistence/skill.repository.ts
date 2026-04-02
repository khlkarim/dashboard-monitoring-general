import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Skill } from '../../domain/skill';

export abstract class SkillRepository {
  abstract create(
    data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Skill>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Skill[]>;

  abstract findById(id: Skill['id']): Promise<NullableType<Skill>>;

  abstract findByIds(ids: Skill['id'][]): Promise<Skill[]>;

  abstract update(
    id: Skill['id'],
    payload: DeepPartial<Skill>,
  ): Promise<Skill | null>;

  abstract remove(id: Skill['id']): Promise<void>;
}
