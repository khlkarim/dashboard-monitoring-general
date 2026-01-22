import { Action } from '../../../../domain/action';
import { RiskMapper } from '../../../../../risks/infrastructure/persistence/relational/mappers/risk.mapper';
import { ActionEntity } from '../entities/action.entity';

export class ActionMapper {
  static toDomain(raw: ActionEntity): Action {
    const domainEntity = new Action();
    domainEntity.type = raw.type;

    if (raw.risk) {
      domainEntity.risk = RiskMapper.toDomain(raw.risk);
    }

    domainEntity.description = raw.description;
    domainEntity.title = raw.title;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Action): ActionEntity {
    const persistenceEntity = new ActionEntity();
    persistenceEntity.type = domainEntity.type;

    if (domainEntity.risk) {
      persistenceEntity.risk = RiskMapper.toPersistence(domainEntity.risk);
    }

    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
