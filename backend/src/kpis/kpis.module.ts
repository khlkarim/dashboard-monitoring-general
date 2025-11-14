import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { KpisService } from './kpis.service';
import { KpisController } from './kpis.controller';
import { RelationalKpiPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalKpiPersistenceModule,
  ],
  controllers: [KpisController],
  providers: [KpisService],
  exports: [KpisService, RelationalKpiPersistenceModule],
})
export class KpisModule {}
