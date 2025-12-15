import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './domain/task';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiCreatedResponse({
    type: Task,
  })
  @Roles(RoleEnum.president, RoleEnum.administrator)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Task),
  })
  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Get()
  async findAll(
    @Query() query: FindAllTasksDto,
  ): Promise<InfinityPaginationResponseDto<Task>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.tasksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Task,
  })
  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @ApiOkResponse({
    type: Task,
  })
  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() request,
  ) {
    // If the user is a member, they can only update tasks assigned to them
    if (request.user.role.id === RoleEnum.member) {
      const task = await this.tasksService.findById(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      if (task.assignee.id !== request.user.id) {
        throw new ForbiddenException(
          'You can only update tasks assigned to you',
        );
      }
    }
    return this.tasksService.update(id, updateTaskDto);
  }

  @Roles(RoleEnum.president, RoleEnum.administrator)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
