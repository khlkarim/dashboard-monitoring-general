import { RisksModule } from '../risks/risks.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { RelationalActionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => RisksModule),
    // do not remove this comment
    RelationalActionPersistenceModule,
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
  exports: [ActionsService, RelationalActionPersistenceModule],
})
export class ActionsModule { }
