



import {
  // do not remove this comment
  Module,




} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { RelationalActivityPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProcessusModule } from 'src/processus/processus.module';

@Module({
  imports: [
    ProcessusModule,







    // do not remove this comment
    RelationalActivityPersistenceModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService, RelationalActivityPersistenceModule],
})
export class ActivitiesModule {}
