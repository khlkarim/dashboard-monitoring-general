import { Sprint } from '../../../../domain/sprint';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { SprintEntity } from '../entities/sprint.entity';
import { TaskMapper } from '../../../../../tasks/infrastructure/persistence/relational/mappers/task.mapper';
import { KpiMapper } from '../../../../../kpis/infrastructure/persistence/relational/mappers/kpi.mapper';

export class SprintMapper {
  static toDomain(raw: SprintEntity): Sprint {
    const domainEntity = new Sprint();
    domainEntity.validationDate = raw.validationDate;
    domainEntity.status = raw.status;
    if (raw.tasks) {
      domainEntity.tasks = raw.tasks.map((task) => TaskMapper.toDomain(task));
    }
    if (raw.kpis) {
      domainEntity.kpis = raw.kpis.map((kpi) => KpiMapper.toDomain(kpi));
    }

    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }

    domainEntity.endDate = raw.endDate;
    domainEntity.startDate = raw.startDate;
    domainEntity.goal = raw.goal;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Sprint): SprintEntity {
    const persistenceEntity = new SprintEntity();
    persistenceEntity.validationDate = domainEntity.validationDate;
    persistenceEntity.status = domainEntity.status;
    if (domainEntity.tasks) {
      persistenceEntity.tasks = domainEntity.tasks.map((task) =>
        TaskMapper.toPersistence(task),
      );
    }
    if (domainEntity.kpis) {
      persistenceEntity.kpis = domainEntity.kpis.map((kpi) =>
        KpiMapper.toPersistence(kpi),
      );
    }

    if (domainEntity.createdBy) {
      persistenceEntity.createdBy = UserMapper.toPersistence(
        domainEntity.createdBy,
      );
    }

    persistenceEntity.endDate = domainEntity.endDate;
    persistenceEntity.startDate = domainEntity.startDate;
    persistenceEntity.goal = domainEntity.goal;
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
