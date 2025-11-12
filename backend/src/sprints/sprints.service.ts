import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SprintRepository } from './infrastructure/persistence/sprint.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Sprint } from './domain/sprint';

@Injectable()
export class SprintsService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly sprintRepository: SprintRepository,
  ) {}

  async create(createSprintDto: CreateSprintDto) {
    // Do not remove comment below.
    // <creating-property />
    const createdByObject = await this.userService.findById(
      createSprintDto.createdBy.id,
    );
    if (!createdByObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          createdBy: 'notExists',
        },
      });
    }
    const createdBy = createdByObject;

    return this.sprintRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      createdBy,

      endDate: createSprintDto.endDate,

      startDate: createSprintDto.startDate,

      goal: createSprintDto.goal,

      name: createSprintDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.sprintRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Sprint['id']) {
    return this.sprintRepository.findById(id);
  }

  findByIds(ids: Sprint['id'][]) {
    return this.sprintRepository.findByIds(ids);
  }

  async update(
    id: Sprint['id'],

    updateSprintDto: UpdateSprintDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let createdBy: User | undefined = undefined;

    if (updateSprintDto.createdBy) {
      const createdByObject = await this.userService.findById(
        updateSprintDto.createdBy.id,
      );
      if (!createdByObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            createdBy: 'notExists',
          },
        });
      }
      createdBy = createdByObject;
    }

    return this.sprintRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      createdBy,

      endDate: updateSprintDto.endDate,

      startDate: updateSprintDto.startDate,

      goal: updateSprintDto.goal,

      name: updateSprintDto.name,
    });
  }

  remove(id: Sprint['id']) {
    return this.sprintRepository.remove(id);
  }
}
