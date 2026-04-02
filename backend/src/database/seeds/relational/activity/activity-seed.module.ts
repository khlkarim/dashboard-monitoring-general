import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../../../../activities/infrastructure/persistence/relational/entities/activity.entity';
import { ActivitySeedService } from './activity-seed.service';
import { ProcessusEntity } from 'src/processus/infrastructure/persistence/relational/entities/processus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, ProcessusEntity])],
  providers: [ActivitySeedService],
  exports: [ActivitySeedService],
})
export class ActivitySeedModule {}
