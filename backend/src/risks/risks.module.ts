


import {
  // do not remove this comment
  Module,



} from '@nestjs/common';
import { RisksService } from './risks.service';
import { RisksController } from './risks.controller';
import { RelationalRiskPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [






    // do not remove this comment
    RelationalRiskPersistenceModule,
  ],
  controllers: [RisksController],
  providers: [RisksService],
  exports: [RisksService, RelationalRiskPersistenceModule],
})
export class RisksModule {}
