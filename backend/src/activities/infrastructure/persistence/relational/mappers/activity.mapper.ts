import { ProcessusMapper } from 'src/processus/infrastructure/persistence/relational/mappers/processus.mapper';
import { Activity } from '../../../../domain/activity';




import { ActivityEntity } from '../entities/activity.entity';

export class ActivityMapper {
  static toDomain(raw: ActivityEntity): Activity {
    const domainEntity = new Activity();
    if (raw.processus) {
      domainEntity.processus = ProcessusMapper.toDomain(raw.processus);
    }

  domainEntity.endDate = raw.endDate;




  domainEntity.startDate = raw.startDate;




  domainEntity.description = raw.description;




  domainEntity.title = raw.title;




    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Activity): ActivityEntity {
    const persistenceEntity = new ActivityEntity();
    if (domainEntity.processus) {
      persistenceEntity.processus = ProcessusMapper.toPersistence(domainEntity.processus);
    }

  persistenceEntity.endDate = domainEntity.endDate;




  persistenceEntity.startDate = domainEntity.startDate;




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
