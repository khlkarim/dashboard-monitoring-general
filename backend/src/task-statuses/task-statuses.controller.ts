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
} from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TaskStatus } from './domain/task-status';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTaskStatusesDto } from './dto/find-all-task-statuses.dto';

@ApiTags('Taskstatuses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'task-statuses',
  version: '1',
})
export class TaskStatusesController {
  constructor(private readonly taskStatusesService: TaskStatusesService) {}

  @Post()
  @ApiCreatedResponse({
    type: TaskStatus,
  })
  create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return this.taskStatusesService.create(createTaskStatusDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(TaskStatus),
  })
  async findAll(
    @Query() query: FindAllTaskStatusesDto,
  ): Promise<InfinityPaginationResponseDto<TaskStatus>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.taskStatusesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TaskStatus,
  })
  findById(@Param('id') id: string) {
    return this.taskStatusesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TaskStatus,
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskStatusesService.update(id, updateTaskStatusDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.taskStatusesService.remove(id);
  }
}
