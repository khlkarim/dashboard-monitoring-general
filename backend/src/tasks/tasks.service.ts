import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { SprintsService } from '../sprints/sprints.service';
import { Sprint } from '../sprints/domain/sprint';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './infrastructure/persistence/task.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Task } from './domain/task';

@Injectable()
export class TasksService {
  constructor(
    private readonly userService: UsersService,

    private readonly sprintService: SprintsService,

    // Dependencies here
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    // Do not remove comment below.
    // <creating-property />

    const reporterObject = await this.userService.findById(
      createTaskDto.reporter.id,
    );
    if (!reporterObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          reporter: 'notExists',
        },
      });
    }
    const reporter = reporterObject;

    const assigneeObject = await this.userService.findById(
      createTaskDto.assignee.id,
    );
    if (!assigneeObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          assignee: 'notExists',
        },
      });
    }
    const assignee = assigneeObject;

    const sprintObject = await this.sprintService.findById(
      createTaskDto.sprint.id,
    );
    if (!sprintObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          sprint: 'notExists',
        },
      });
    }
    const sprint = sprintObject;

    return this.taskRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      type: createTaskDto.type,

      status: createTaskDto.status,

      reporter,

      assignee,

      sprint,

      dueDate: createTaskDto.dueDate,

      description: createTaskDto.description,

      title: createTaskDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.taskRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Task['id']) {
    return this.taskRepository.findById(id);
  }

  findByIds(ids: Task['id'][]) {
    return this.taskRepository.findByIds(ids);
  }

  async update(
    id: Task['id'],

    updateTaskDto: UpdateTaskDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let reporter: User | undefined = undefined;

    if (updateTaskDto.reporter) {
      const reporterObject = await this.userService.findById(
        updateTaskDto.reporter.id,
      );
      if (!reporterObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            reporter: 'notExists',
          },
        });
      }
      reporter = reporterObject;
    }

    let assignee: User | undefined = undefined;

    if (updateTaskDto.assignee) {
      const assigneeObject = await this.userService.findById(
        updateTaskDto.assignee.id,
      );
      if (!assigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            assignee: 'notExists',
          },
        });
      }
      assignee = assigneeObject;
    }

    let sprint: Sprint | undefined = undefined;

    if (updateTaskDto.sprint) {
      const sprintObject = await this.sprintService.findById(
        updateTaskDto.sprint.id,
      );
      if (!sprintObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            sprint: 'notExists',
          },
        });
      }
      sprint = sprintObject;
    }

    return this.taskRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      type: updateTaskDto.type,

      status: updateTaskDto.status,

      reporter,

      assignee,

      sprint,

      dueDate: updateTaskDto.dueDate,

      description: updateTaskDto.description,

      title: updateTaskDto.title,
    });
  }

  remove(id: Task['id']) {
    return this.taskRepository.remove(id);
  }
}
