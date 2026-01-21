import { ActionMapper } from '../../../../../actions/infrastructure/persistence/relational/mappers/action.mapper';
import { Risk } from '../../../../domain/risk';



import { RiskEntity } from '../entities/risk.entity';

export class RiskMapper {
  static toDomain(raw: RiskEntity): Risk {
    const domainEntity = new Risk();
    domainEntity.description = raw.description;




    domainEntity.criticity = raw.criticity;




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
    persistenceEntity.description = domainEntity.description;




    persistenceEntity.criticity = domainEntity.criticity;




    persistenceEntity.title = domainEntity.title;




    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
