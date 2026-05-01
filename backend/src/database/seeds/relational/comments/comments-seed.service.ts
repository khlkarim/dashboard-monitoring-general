import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../../../comments/infrastructure/persistence/relational/entities/comment.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class CommentsSeedService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async run() { }
}
