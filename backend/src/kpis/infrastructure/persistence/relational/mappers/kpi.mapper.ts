import { Kpi } from '../../../../domain/kpi';

import { KpiEntity } from '../entities/kpi.entity';

export class KpiMapper {
  static toDomain(raw: KpiEntity): Kpi {
    const domainEntity = new Kpi();
    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Kpi): KpiEntity {
    const persistenceEntity = new KpiEntity();
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
