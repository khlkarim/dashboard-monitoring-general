import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../../../../comments/infrastructure/persistence/relational/entities/comment.entity';
import { CommentsSeedService } from './comments-seed.service';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { TaskEntity } from 'src/tasks/infrastructure/persistence/relational/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, TaskEntity, UserEntity])],
  providers: [CommentsSeedService],
  exports: [CommentsSeedService],
})
export class CommentsSeedModule { }
