





import { 
  // common
  Injectable,






} from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatusRepository } from './infrastructure/persistence/task-status.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { TaskStatus } from './domain/task-status';

@Injectable()
export class TaskStatusesService {
  constructor(



    // Dependencies here
    private readonly taskStatusRepository: TaskStatusRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createTaskStatusDto: CreateTaskStatusDto
  ) {
    // Do not remove comment below.
    // <creating-property />
  
  
  

    return this.taskStatusRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
  precedence: createTaskStatusDto.precedence,

  description: createTaskStatusDto.description,

  title: createTaskStatusDto.title,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.taskStatusRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: TaskStatus['id']) {
    return this.taskStatusRepository.findById(id);
  }

  findByIds(ids: TaskStatus['id'][]) {
    return this.taskStatusRepository.findByIds(ids);
  }

  async update(
    id: TaskStatus['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    // Do not remove comment below.
    // <updating-property />




    return this.taskStatusRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
  precedence: updateTaskStatusDto.precedence,

  description: updateTaskStatusDto.description,

  title: updateTaskStatusDto.title,

    });
  }

  remove(id: TaskStatus['id']) {
    return this.taskStatusRepository.remove(id);
  }
}
