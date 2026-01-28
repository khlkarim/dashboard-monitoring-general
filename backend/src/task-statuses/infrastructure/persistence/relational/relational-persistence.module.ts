import { Module } from '@nestjs/common';
import { TaskStatusRepository } from '../task-status.repository';
import { TaskStatusRelationalRepository } from './repositories/task-status.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatusEntity } from './entities/task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatusEntity])],
  providers: [
    {
      provide: TaskStatusRepository,
      useClass: TaskStatusRelationalRepository,
    },
  ],
  exports: [TaskStatusRepository],
})
export class RelationalTaskStatusPersistenceModule {}
