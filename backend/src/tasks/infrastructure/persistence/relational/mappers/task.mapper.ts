import { Task } from '../../../../domain/task';
import { ProcessusMapper } from '../../../../../processus/infrastructure/persistence/relational/mappers/processus.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { SprintMapper } from '../../../../../sprints/infrastructure/persistence/relational/mappers/sprint.mapper';
import { TaskEntity } from '../entities/task.entity';
import { CommentMapper } from '../../../../../comments/infrastructure/persistence/relational/mappers/comment.mapper';

export class TaskMapper {
  static toDomain(raw: TaskEntity): Task {
    const domainEntity = new Task();
    domainEntity.estimatedEndDate = raw.estimatedEndDate;
    domainEntity.estimatedStartDate = raw.estimatedStartDate;
    domainEntity.expectedDelivrable = raw.expectedDelivrable;

    if (raw.processus) {
      domainEntity.processus = ProcessusMapper.toDomain(raw.processus);
    }
    else if (raw.processus === null) {
      domainEntity.processus = null;
    }

    domainEntity.criticality = raw.criticality;
    domainEntity.startDate = raw.startDate;
    domainEntity.deliverable = raw.deliverable;
    domainEntity.status = raw.status;

    if (raw.reporter) {
      domainEntity.reporter = UserMapper.toDomain(raw.reporter);
    }

    if (raw.assignee) {
      domainEntity.assignee = UserMapper.toDomain(raw.assignee);
    }

    if (raw.sprint) {
      domainEntity.sprint = SprintMapper.toDomain(raw.sprint);
    }

    if (raw.comments) {
      domainEntity.comments = raw.comments.map((comment) =>
        CommentMapper.toDomain(comment),
      );
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
    persistenceEntity.estimatedEndDate = domainEntity.estimatedEndDate;
    persistenceEntity.estimatedStartDate = domainEntity.estimatedStartDate;
    persistenceEntity.expectedDelivrable = domainEntity.expectedDelivrable;

    if (domainEntity.processus) {
      persistenceEntity.processus = ProcessusMapper.toPersistence(domainEntity.processus);
    }
    else if (domainEntity.processus === null) {
      persistenceEntity.processus = null;
    }

    persistenceEntity.criticality = domainEntity.criticality;
    persistenceEntity.startDate = domainEntity.startDate;
    persistenceEntity.deliverable = domainEntity.deliverable;
    persistenceEntity.status = domainEntity.status;

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

    if (domainEntity.comments) {
      persistenceEntity.comments = domainEntity.comments.map((comment) =>
        CommentMapper.toPersistence(comment),
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
