import { ProcessusModule } from '../processus/processus.module';


import {
  // common
  Module,
  forwardRef,


  
} from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { SkillsModule } from 'src/skills/skills.module';
import { TasksModule } from '../tasks/tasks.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [
      ProcessusModule,
  
  




    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
    SkillsModule,
    forwardRef(() => TasksModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule { }
