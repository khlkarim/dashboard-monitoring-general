import { Module } from '@nestjs/common';
import { ProcessusRepository } from '../processus.repository';
import { ProcessusRelationalRepository } from './repositories/processus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessusEntity } from './entities/processus.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { KpiEntity } from '../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { ActivityEntity } from '../../../../activities/infrastructure/persistence/relational/entities/activity.entity';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProcessusEntity,
      UserEntity,
      KpiEntity,
      ActivityEntity,
      TaskEntity,
    ]),
  ],
  providers: [
    {
      provide: ProcessusRepository,
      useClass: ProcessusRelationalRepository,
    },
  ],
  exports: [ProcessusRepository],
})
export class RelationalProcessusPersistenceModule {}
