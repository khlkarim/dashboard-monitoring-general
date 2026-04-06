import { Kpi } from '../../../../domain/kpi';
import { ProcessusMapper } from '../../../../../processus/infrastructure/persistence/relational/mappers/processus.mapper';
import { KpiEntity } from '../entities/kpi.entity';
import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintMapper } from '../../../../../sprints/infrastructure/persistence/relational/mappers/sprint.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class KpiMapper {
  static toDomain(raw: KpiEntity): Kpi {
    const domainEntity = new Kpi();
    domainEntity.samplingMethod = raw.samplingMethod;
    domainEntity.samples = raw.samples;
    domainEntity.samplingRate = raw.samplingRate;

    if (raw.processus) {
      domainEntity.processus = ProcessusMapper.toDomain(raw.processus);
    }

    if (raw.sprint) {
      domainEntity.sprint = SprintMapper.toDomain(raw.sprint);
    }

    if (raw.manager) {
      domainEntity.manager = UserMapper.toDomain(raw.manager);
    }

    domainEntity.description = raw.description;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Kpi): KpiEntity {
    const persistenceEntity = new KpiEntity();
    persistenceEntity.samplingMethod = domainEntity.samplingMethod;
    persistenceEntity.samples = domainEntity.samples;
    persistenceEntity.samplingRate = domainEntity.samplingRate;

    if (domainEntity.processus) {
      persistenceEntity.processus = ProcessusMapper.toPersistence(domainEntity.processus);
    }

    if (domainEntity.sprint) {
      const sprintEntity = new SprintEntity();
      sprintEntity.id = domainEntity.sprint.id;
      persistenceEntity.sprint = sprintEntity;
    }

    if (domainEntity.manager) {
      const userEntity = new UserEntity();
      userEntity.id = domainEntity.manager.id;
      persistenceEntity.manager = userEntity;
    }

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

