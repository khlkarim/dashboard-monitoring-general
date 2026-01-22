import { Notification } from '../../../../domain/notification';
import { NotificationEntity } from '../entities/notification.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const domainEntity = new Notification();
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;
    if (raw.recipients) {
      domainEntity.recipients = raw.recipients.map((user) =>
        UserMapper.toDomain(user),
      );
    }
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Notification): NotificationEntity {
    const persistenceEntity = new NotificationEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;
    if (domainEntity.recipients) {
      persistenceEntity.recipients = domainEntity.recipients.map((user) => {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        return userEntity;
      });
    }
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
