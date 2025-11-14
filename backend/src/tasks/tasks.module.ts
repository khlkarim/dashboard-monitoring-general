import { UsersModule } from '../users/users.module';
import { SprintsModule } from '../sprints/sprints.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { RelationalTaskPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    SprintsModule,

    // do not remove this comment
    RelationalTaskPersistenceModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService, RelationalTaskPersistenceModule],
})
export class TasksModule {}
