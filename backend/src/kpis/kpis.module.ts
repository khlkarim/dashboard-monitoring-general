import { ProcessusModule } from '../processus/processus.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { KpisService } from './kpis.service';
import { KpisController } from './kpis.controller';
import { RelationalKpiPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { SprintsModule } from '../sprints/sprints.module';

@Module({
  imports: [
    ProcessusModule,
    // do not remove this comment
    RelationalKpiPersistenceModule,
    UsersModule,
    SprintsModule,
  ],
  controllers: [KpisController],
  providers: [KpisService],
  exports: [KpisService, RelationalKpiPersistenceModule],
})
export class KpisModule { }

