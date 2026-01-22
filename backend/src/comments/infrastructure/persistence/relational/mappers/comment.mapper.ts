import { Comment } from '../../../../domain/comment';
import { TaskMapper } from '../../../../../tasks/infrastructure/persistence/relational/mappers/task.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { CommentEntity } from '../entities/comment.entity';

export class CommentMapper {
  static toDomain(raw: CommentEntity): Comment {
    const domainEntity = new Comment();

    if (raw.task) {
      domainEntity.task = TaskMapper.toDomain(raw.task);
    }
    else if (raw.task === null) {
      domainEntity.task = null;
    }

    if (raw.author) {
      domainEntity.author = UserMapper.toDomain(raw.author);
    }
    else if (raw.author === null) {
      domainEntity.author = null;
    }

    domainEntity.content = raw.content;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Comment): CommentEntity {
    const persistenceEntity = new CommentEntity();
    if (domainEntity.task) {
      persistenceEntity.task = TaskMapper.toPersistence(domainEntity.task);
    }
    else if (domainEntity.task === null) {
      persistenceEntity.task = null;
    }

    if (domainEntity.author) {
      persistenceEntity.author = UserMapper.toPersistence(domainEntity.author);
    }
    else if (domainEntity.author === null) {
      persistenceEntity.author = null;
    }
    persistenceEntity.content = domainEntity.content;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
