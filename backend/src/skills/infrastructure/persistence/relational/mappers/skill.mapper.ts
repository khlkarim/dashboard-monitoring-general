import { Skill } from '../../../../domain/skill';


import { SkillEntity } from '../entities/skill.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class SkillMapper {
  static toDomain(raw: SkillEntity): Skill {
    const domainEntity = new Skill();
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;
    domainEntity.id = raw.id;
    if (raw.users) {
      domainEntity.users = raw.users.map((user) => UserMapper.toDomain(user));
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Skill): SkillEntity {
    const persistenceEntity = new SkillEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.users) {
      persistenceEntity.users = domainEntity.users.map((user) =>
        UserMapper.toPersistence(user),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
