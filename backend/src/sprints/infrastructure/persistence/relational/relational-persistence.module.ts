import { Module } from '@nestjs/common';
import { SprintRepository } from '../sprint.repository';
import { SprintRelationalRepository } from './repositories/sprint.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from './entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SprintEntity])],
  providers: [
    {
      provide: SprintRepository,
      useClass: SprintRelationalRepository,
    },
  ],
  exports: [SprintRepository],
})
export class RelationalSprintPersistenceModule {}
