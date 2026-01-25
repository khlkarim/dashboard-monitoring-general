import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Skill } from '../../../../domain/skill';
import { SkillRepository } from '../../skill.repository';
import { SkillMapper } from '../mappers/skill.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SkillRelationalRepository implements SkillRepository {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  async create(data: Skill): Promise<Skill> {
    const persistenceModel = SkillMapper.toPersistence(data);
    const newEntity = await this.skillRepository.save(
      this.skillRepository.create(persistenceModel),
    );
    return SkillMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Skill[]> {
    const entities = await this.skillRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SkillMapper.toDomain(entity));
  }

  async findById(id: Skill['id']): Promise<NullableType<Skill>> {
    const entity = await this.skillRepository.findOne({
      where: { id },
    });

    return entity ? SkillMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Skill['id'][]): Promise<Skill[]> {
    const entities = await this.skillRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SkillMapper.toDomain(entity));
  }

  async update(
    id: Skill['id'],
    payload: Partial<Skill>,
  ): Promise<Skill> {
    const entity = await this.skillRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.skillRepository.save(
      this.skillRepository.create(
        SkillMapper.toPersistence({
          ...SkillMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SkillMapper.toDomain(updatedEntity);
  }

  async remove(id: Skill['id']): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
