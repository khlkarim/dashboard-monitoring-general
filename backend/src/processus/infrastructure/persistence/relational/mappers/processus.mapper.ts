import { Processus } from '../../../../domain/processus';
import { ProcessusEntity } from '../entities/processus.entity';
import { KpiMapper } from '../../../../../kpis/infrastructure/persistence/relational/mappers/kpi.mapper';

export class ProcessusMapper {
  static toDomain(raw: ProcessusEntity): Processus {
    const domainEntity = new Processus();

    domainEntity.description = raw.description;
    domainEntity.label = raw.label;
    if (raw.kpis) {
      domainEntity.kpis = raw.kpis.map((kpi) => KpiMapper.toDomain(kpi));
    }
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Processus): ProcessusEntity {
    const persistenceEntity = new ProcessusEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.label = domainEntity.label;
    if (domainEntity.kpis) {
      persistenceEntity.kpis = domainEntity.kpis.map((kpi) =>
        KpiMapper.toPersistence(kpi),
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
