import { UsersService } from '../users/users.service';
import { SprintsService } from '../sprints/sprints.service';
import { User } from '../users/domain/user';
import { Sprint } from '../sprints/domain/sprint';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { KpiRepository } from './infrastructure/persistence/kpi.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Kpi } from './domain/kpi';

@Injectable()
export class KpisService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sprintsService: SprintsService,
    // Dependencies here
    private readonly kpiRepository: KpiRepository,
  ) { }

  async create(createKpiDto: CreateKpiDto) {
    // Do not remove comment below.
    // <creating-property />

    // Validate and fetch createdBy user (required)
    const createdByObject = await this.usersService.findById(
      createKpiDto.createdBy.id,
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

    // Validate and fetch sprint (optional)
    let sprint: Sprint | null = null;
    if (createKpiDto.sprint) {
      const sprintObject = await this.sprintsService.findById(
        createKpiDto.sprint.id,
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

    return this.kpiRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      sprint,
      createdBy,
      targetValue: createKpiDto.targetValue,
      actualValue: createKpiDto.actualValue,
      description: createKpiDto.description,
      name: createKpiDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.kpiRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Kpi['id']) {
    return this.kpiRepository.findById(id);
  }

  findByIds(ids: Kpi['id'][]) {
    return this.kpiRepository.findByIds(ids);
  }

  async update(
    id: Kpi['id'],

    updateKpiDto: UpdateKpiDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let createdBy: User | undefined = undefined;
    if (updateKpiDto.createdBy) {
      const createdByObject = await this.usersService.findById(
        updateKpiDto.createdBy.id,
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

    let sprint: Sprint | null | undefined = undefined;
    if (updateKpiDto.sprint) {
      const sprintObject = await this.sprintsService.findById(
        updateKpiDto.sprint.id,
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
    } else if (updateKpiDto.sprint === null) {
      sprint = null;
    }

    return this.kpiRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      sprint,
      createdBy,
      targetValue: updateKpiDto.targetValue,
      actualValue: updateKpiDto.actualValue,
      description: updateKpiDto.description,
      name: updateKpiDto.name,
    });
  }

  remove(id: Kpi['id']) {
    return this.kpiRepository.remove(id);
  }
}


