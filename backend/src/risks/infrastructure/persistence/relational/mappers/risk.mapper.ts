import { ActionMapper } from '../../../../../actions/infrastructure/persistence/relational/mappers/action.mapper';
import { Risk } from '../../../../domain/risk';
import { RiskEntity } from '../entities/risk.entity';

export class RiskMapper {
  static toDomain(raw: RiskEntity): Risk {
    const domainEntity = new Risk();
    domainEntity.detection = raw.detection;
    domainEntity.occurrence = raw.occurrence;
    domainEntity.severity = raw.severity;
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;

    if (raw.actions) {
      domainEntity.actions = raw.actions.map((action) =>
        ActionMapper.toDomain(action),
      );
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Risk): RiskEntity {
    const persistenceEntity = new RiskEntity();

    persistenceEntity.detection = domainEntity.detection;
    persistenceEntity.occurrence = domainEntity.occurrence;
    persistenceEntity.severity = domainEntity.severity;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;

    if (domainEntity.actions) {
      persistenceEntity.actions = domainEntity.actions.map((action) =>
        ActionMapper.toPersistence(action),
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
