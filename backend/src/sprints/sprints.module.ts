import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { RelationalSprintPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // do not remove this comment
    RelationalSprintPersistenceModule,
  ],
  controllers: [SprintsController],
  providers: [SprintsService],
  exports: [SprintsService, RelationalSprintPersistenceModule],
})
export class SprintsModule { }
