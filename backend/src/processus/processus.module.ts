

import {
  // do not remove this comment
  Module,


} from '@nestjs/common';
import { ProcessusService } from './processus.service';
import { ProcessusController } from './processus.controller';
import { RelationalProcessusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [




    // do not remove this comment
    RelationalProcessusPersistenceModule,
  ],
  controllers: [ProcessusController],
  providers: [ProcessusService],
  exports: [ProcessusService, RelationalProcessusPersistenceModule],
})
export class ProcessusModule {}
