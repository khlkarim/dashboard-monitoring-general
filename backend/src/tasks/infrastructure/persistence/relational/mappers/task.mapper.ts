import { Task } from '../../../../domain/task';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SprintMapper } from '../../../../../sprints/infrastructure/persistence/relational/mappers/sprint.mapper';

import { TaskEntity } from '../entities/task.entity';

export class TaskMapper {
  static toDomain(raw: TaskEntity): Task {
    const domainEntity = new Task();
    if (raw.reporter) {
      domainEntity.reporter = UserMapper.toDomain(raw.reporter);
    }

    if (raw.assignee) {
      domainEntity.assignee = UserMapper.toDomain(raw.assignee);
    }

    if (raw.sprint) {
      domainEntity.sprint = SprintMapper.toDomain(raw.sprint);
    }

    domainEntity.dueDate = raw.dueDate;

    domainEntity.description = raw.description;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Task): TaskEntity {
    const persistenceEntity = new TaskEntity();
    if (domainEntity.reporter) {
      persistenceEntity.reporter = UserMapper.toPersistence(
        domainEntity.reporter,
      );
    }

    if (domainEntity.assignee) {
      persistenceEntity.assignee = UserMapper.toPersistence(
        domainEntity.assignee,
      );
    }

    if (domainEntity.sprint) {
      persistenceEntity.sprint = SprintMapper.toPersistence(
        domainEntity.sprint,
      );
    }

    persistenceEntity.dueDate = domainEntity.dueDate;

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
