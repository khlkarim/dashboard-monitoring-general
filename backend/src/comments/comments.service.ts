import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/domain/task';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './infrastructure/persistence/comment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Comment } from './domain/comment';

@Injectable()
export class CommentsService {
  constructor(
    private readonly taskService: TasksService,
    private readonly userService: UsersService,
    // Dependencies here
    private readonly commentRepository: CommentRepository,
  ) { }

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCommentDto: CreateCommentDto
  ) {
    // Do not remove comment below.
    // <creating-property />
    let task: Task | null | undefined = undefined;

    if (createCommentDto.task) {
      const taskObject = await this.taskService.findById(
        createCommentDto.task.id,
      );
      if (!taskObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            task: 'notExists',
          },
        });
      }
      task = taskObject;
    }
    else if (createCommentDto.task === null) {
      task = null;
    }

    let author: User | null | undefined = undefined;

    if (createCommentDto.author) {
      const authorObject = await this.userService.findById(
        createCommentDto.author.id,
      );
      if (!authorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            author: 'notExists',
          },
        });
      }
      author = authorObject;
    }
    else if (createCommentDto.author === null) {
      author = null;
    }

    return this.commentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      task,

      author,

      content: createCommentDto.content,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.commentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Comment['id']) {
    return this.commentRepository.findById(id);
  }

  findByIds(ids: Comment['id'][]) {
    return this.commentRepository.findByIds(ids);
  }

  async update(
    id: Comment['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCommentDto: UpdateCommentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let task: Task | null | undefined = undefined;

    if (updateCommentDto.task) {
      const taskObject = await this.taskService.findById(
        updateCommentDto.task.id,
      );
      if (!taskObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            task: 'notExists',
          },
        });
      }
      task = taskObject;
    }
    else if (updateCommentDto.task === null) {
      task = null;
    }

    let author: User | null | undefined = undefined;

    if (updateCommentDto.author) {
      const authorObject = await this.userService.findById(
        updateCommentDto.author.id,
      );
      if (!authorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            author: 'notExists',
          },
        });
      }
      author = authorObject;
    }
    else if (updateCommentDto.author === null) {
      author = null;
    }

    return this.commentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      task,

      author,

      content: updateCommentDto.content,

    });
  }

  remove(id: Comment['id']) {
    return this.commentRepository.remove(id);
  }
}
