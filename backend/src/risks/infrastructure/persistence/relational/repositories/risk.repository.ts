import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RiskEntity } from '../entities/risk.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Risk } from '../../../../domain/risk';
import { RiskRepository } from '../../risk.repository';
import { RiskMapper } from '../mappers/risk.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RiskRelationalRepository implements RiskRepository {
  constructor(
    @InjectRepository(RiskEntity)
    private readonly riskRepository: Repository<RiskEntity>,
  ) {}

  async create(data: Risk): Promise<Risk> {
    const persistenceModel = RiskMapper.toPersistence(data);
    const newEntity = await this.riskRepository.save(
      this.riskRepository.create(persistenceModel),
    );
    return RiskMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Risk[]> {
    const entities = await this.riskRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RiskMapper.toDomain(entity));
  }

  async findById(id: Risk['id']): Promise<NullableType<Risk>> {
    const entity = await this.riskRepository.findOne({
      where: { id },
    });

    return entity ? RiskMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Risk['id'][]): Promise<Risk[]> {
    const entities = await this.riskRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RiskMapper.toDomain(entity));
  }

  async update(
    id: Risk['id'],
    payload: Partial<Risk>,
  ): Promise<Risk> {
    const entity = await this.riskRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.riskRepository.save(
      this.riskRepository.create(
        RiskMapper.toPersistence({
          ...RiskMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RiskMapper.toDomain(updatedEntity);
  }

  async remove(id: Risk['id']): Promise<void> {
    await this.riskRepository.delete(id);
  }
}
