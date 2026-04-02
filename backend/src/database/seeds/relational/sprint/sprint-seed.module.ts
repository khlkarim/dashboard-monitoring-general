import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintSeedService } from './sprint-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([SprintEntity, UserEntity])],
    providers: [SprintSeedService],
    exports: [SprintSeedService],
})
export class SprintSeedModule { }
