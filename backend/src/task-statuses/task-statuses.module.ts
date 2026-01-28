


import {
  // do not remove this comment
  Module,



} from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { TaskStatusesController } from './task-statuses.controller';
import { RelationalTaskStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [






    // do not remove this comment
    RelationalTaskStatusPersistenceModule,
  ],
  controllers: [TaskStatusesController],
  providers: [TaskStatusesService],
  exports: [TaskStatusesService, RelationalTaskStatusPersistenceModule],
})
export class TaskStatusesModule {}
