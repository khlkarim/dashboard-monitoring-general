import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { TaskSeedService } from './task-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, SprintEntity])],
    providers: [TaskSeedService],
    exports: [TaskSeedService],
})
export class TaskSeedModule { }
