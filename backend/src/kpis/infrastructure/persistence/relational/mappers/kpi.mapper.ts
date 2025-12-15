import { Kpi } from '../../../../domain/kpi';
import { KpiEntity } from '../entities/kpi.entity';
import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintMapper } from '../../../../../sprints/infrastructure/persistence/relational/mappers/sprint.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class KpiMapper {
  static toDomain(raw: KpiEntity): Kpi {
    const domainEntity = new Kpi();

    if (raw.sprint) {
      domainEntity.sprint = SprintMapper.toDomain(raw.sprint);
    }

    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }

    domainEntity.targetValue = raw.targetValue;
    domainEntity.actualValue = raw.actualValue;
    domainEntity.description = raw.description;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Kpi): KpiEntity {
    const persistenceEntity = new KpiEntity();

    if (domainEntity.sprint) {
      const sprintEntity = new SprintEntity();
      sprintEntity.id = domainEntity.sprint.id;
      persistenceEntity.sprint = sprintEntity;
    }

    if (domainEntity.createdBy) {
      const userEntity = new UserEntity();
      userEntity.id = Number(domainEntity.createdBy.id);
      persistenceEntity.createdBy = userEntity;
    }

    persistenceEntity.targetValue = domainEntity.targetValue;
    persistenceEntity.actualValue = domainEntity.actualValue;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

