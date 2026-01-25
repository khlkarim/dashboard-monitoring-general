

import {
  // do not remove this comment
  Module,


} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { RelationalSkillPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [




    // do not remove this comment
    RelationalSkillPersistenceModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService, RelationalSkillPersistenceModule],
})
export class SkillsModule {}
