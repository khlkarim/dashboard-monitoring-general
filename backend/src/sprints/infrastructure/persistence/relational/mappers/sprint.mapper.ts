import { Sprint } from '../../../../domain/sprint';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SprintEntity } from '../entities/sprint.entity';

export class SprintMapper {
  static toDomain(raw: SprintEntity): Sprint {
    const domainEntity = new Sprint();
    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }

    domainEntity.endDate = raw.endDate;

    domainEntity.startDate = raw.startDate;

    domainEntity.goal = raw.goal;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Sprint): SprintEntity {
    const persistenceEntity = new SprintEntity();
    if (domainEntity.createdBy) {
      persistenceEntity.createdBy = UserMapper.toPersistence(
        domainEntity.createdBy,
      );
    }

    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.goal = domainEntity.goal;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
