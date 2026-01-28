import { TaskStatus } from '../../../../domain/task-status';



import { TaskStatusEntity } from '../entities/task-status.entity';

export class TaskStatusMapper {
  static toDomain(raw: TaskStatusEntity): TaskStatus {
    const domainEntity = new TaskStatus();
  domainEntity.precedence = raw.precedence;




  domainEntity.description = raw.description;




  domainEntity.title = raw.title;




    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: TaskStatus): TaskStatusEntity {
    const persistenceEntity = new TaskStatusEntity();
  persistenceEntity.precedence = domainEntity.precedence;




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
