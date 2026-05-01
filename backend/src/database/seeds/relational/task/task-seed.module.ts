import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { TaskSeedService } from './task-seed.service';
import { TaskStatisticsSeedService } from './task-statistics-seed.service';
import { ProcessusEntity } from 'src/processus/infrastructure/persistence/relational/entities/processus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, SprintEntity, SkillEntity, ProcessusEntity])],
    providers: [TaskSeedService, TaskStatisticsSeedService],
    exports: [TaskSeedService, TaskStatisticsSeedService],
})
export class TaskSeedModule { }
