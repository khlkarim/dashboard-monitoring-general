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

  async run() {
    const user = await this.userRepository.findOneBy({});
    const tasks = await this.taskRepository.find();

    if (!user || tasks.length === 0) {
      return;
    }

    const count = await this.repository.count();

    if (count === 0) {
      for (const task of tasks) {
        const comment = this.repository.create({
          content: 'Comment for task ' + task.id,
          task,
          author: user,
        });
        await this.repository.save(comment);
      }
    }
  }
}
