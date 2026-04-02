import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { SprintsService } from '../sprints/sprints.service';
import { Sprint } from '../sprints/domain/sprint';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './infrastructure/persistence/task.repository';
import { CommentRepository } from '../comments/infrastructure/persistence/comment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Task } from './domain/task';
import {
  MemberStatisticsDto,
  TaskStatusDistribution,
} from '../users/dto/member-statistics.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly sprintService: SprintsService,
    // Dependencies here
    private readonly taskRepository: TaskRepository,
    private readonly commentRepository: CommentRepository,
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
      criticality: createTaskDto.criticality,
      startDate: createTaskDto.startDate,

      deliverable: createTaskDto.deliverable,

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

  findAllBySprintIdWithPagination({
    paginationOptions,
    sprintId,
  }: {
    paginationOptions: IPaginationOptions;
    sprintId: Sprint['id'];
  }) {
    return this.taskRepository.findAllBySprintIdWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      sprintId,
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
      criticality: updateTaskDto.criticality,

      startDate: updateTaskDto.startDate,

      deliverable: updateTaskDto.deliverable,

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

  /**
   * Get comprehensive statistics for a member
   * Contains all business logic for calculating metrics and scores
   */
  async getMemberStatistics(userId: string): Promise<MemberStatisticsDto> {
    // 1. Get raw data from repository (simple queries)
    const totalTasks = await this.taskRepository.getTaskCountByUser(userId);
    const statusCounts =
      await this.taskRepository.getTaskStatusCountsByUser(userId);
    const overdueTasks =
      await this.taskRepository.getOverdueTasksCountByUser(userId);
    const completedTasksWithDates =
      await this.taskRepository.getCompletedTasksWithDatesByUser(userId);

    // Get comment data
    const totalComments =
      await this.commentRepository.getCommentCountByUser(userId);

    // 2. BUSINESS LOGIC: Build task status distribution
    const taskStatusDistribution: TaskStatusDistribution = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    statusCounts.forEach((row) => {
      // Only count statuses that match our business model
      if (
        row.status === 'TODO' ||
        row.status === 'IN_PROGRESS' ||
        row.status === 'DONE'
      ) {
        taskStatusDistribution[row.status] = row.count;
      }
    });

    const completedTasks = taskStatusDistribution.DONE;

    // 3. BUSINESS LOGIC: Calculate completion rate
    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // 4. BUSINESS LOGIC: Calculate completed this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const completedThisMonth =
      await this.taskRepository.getCompletedTasksCountByUserAfterDate(
        userId,
        startOfMonth,
      );
    const commentsThisMonth =
      await this.commentRepository.getCommentCountByUserAfterDate(
        userId,
        startOfMonth,
      );

    // 5. BUSINESS LOGIC: Calculate average completion time (in days)
    let averageCompletionTime = 0;
    if (completedTasksWithDates.length > 0) {
      const totalDays = completedTasksWithDates.reduce((sum, task) => {
        const days = Math.floor(
          (task.completedDate.getTime() - task.startDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        return sum + days;
      }, 0);
      averageCompletionTime = totalDays / completedTasksWithDates.length;
    }

    // 6. BUSINESS LOGIC: Calculate on-time completion rate
    let onTimeRate = 0;
    const tasksWithDueDate = completedTasksWithDates.filter(
      (task) => task.dueDate !== undefined,
    );
    if (tasksWithDueDate.length > 0) {
      const onTimeCount = tasksWithDueDate.filter((task) => {
        return task.completedDate <= task.dueDate!;
      }).length;
      onTimeRate = (onTimeCount / tasksWithDueDate.length) * 100;
    }

    // 7. BUSINESS LOGIC: Calculate activity score
    // Business rule: 5 tasks per month = 100% activity
    const activityScore = Math.min((completedThisMonth / 5) * 100, 100);

    // 8. BUSINESS LOGIC: Calculate comment activity rate
    // Business rule: 10 comments per month = 100% comment activity
    const commentActivityRate = Math.min((commentsThisMonth / 10) * 100, 100);

    // 9. BUSINESS LOGIC: Calculate engagement score
    // Business formula: weighted average including comment activity
    // 35% completion + 35% on-time + 15% task activity + 15% comment activity
    const engagementScore =
      completionRate * 0.35 +
      onTimeRate * 0.35 +
      activityScore * 0.15 +
      commentActivityRate * 0.15;

    // Return calculated statistics with proper rounding
    // Note: comment metrics are used internally but not exposed in the response
    return {
      totalTasks,
      taskStatusDistribution,
      overdueTasks,
      completionRate: Math.round(completionRate * 100) / 100,
      engagementScore: Math.round(engagementScore * 100) / 100,
      averageCompletionTime: Math.round(averageCompletionTime * 100) / 100,
      completedThisMonth,
      onTimeRate: Math.round(onTimeRate * 100) / 100,
    };
  }
}
