import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { LlmModule } from 'src/llm/llm.module';
import { RisksService } from './risks.service';
import { RisksController } from './risks.controller';
import { RelationalRiskPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ActionsModule } from 'src/actions/actions.module';

@Module({
  imports: [
    LlmModule,
    forwardRef(() => ActionsModule),
    // do not remove this comment
    RelationalRiskPersistenceModule,
  ],
  controllers: [RisksController],
  providers: [RisksService],
  exports: [RisksService, RelationalRiskPersistenceModule],
})
export class RisksModule { }
