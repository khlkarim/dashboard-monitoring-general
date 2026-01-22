import { ProcessusService } from '../processus/processus.service';
import { Processus } from '../processus/domain/processus';
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
    private readonly processusService: ProcessusService,
    private readonly usersService: UsersService,
    private readonly sprintsService: SprintsService,
    // Dependencies here
    private readonly kpiRepository: KpiRepository,
  ) { }

  async create(createKpiDto: CreateKpiDto) {
    // Do not remove comment below.
    // <creating-property />
    let processus: Processus | null | undefined = undefined;

    if (createKpiDto.processus) {
      const processusObject = await this.processusService.findById(
        createKpiDto.processus.id,
      );
      if (!processusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            processus: 'notExists',
          },
        });
      }
      processus = processusObject;
    }
    else if (createKpiDto.processus === null) {
      processus = null;
    }
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
      samples: createKpiDto.samples,

      samplingRate: createKpiDto.samplingRate,

      processus,

      sprint,
      createdBy,
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

  findAllBySprintIdWithPagination({
    paginationOptions,
    sprintId,
  }: {
    paginationOptions: IPaginationOptions;
    sprintId: Sprint['id'];
  }) {
    return this.kpiRepository.findAllBySprintIdWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      sprintId,
    });
  }

  findAllByProcessusIdWithPagination({
    paginationOptions,
    processusId,
  }: {
    paginationOptions: IPaginationOptions;
    processusId: Processus['id'];
  }) {
    return this.kpiRepository.findAllByProcessusIdWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      processusId,
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
    let processus: Processus | null | undefined = undefined;

    if (updateKpiDto.processus) {
      const processusObject = await this.processusService.findById(
        updateKpiDto.processus.id,
      );
      if (!processusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            processus: 'notExists',
          },
        });
      }
      processus = processusObject;
    }
    else if (updateKpiDto.processus === null) {
      processus = null;
    }


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
      samples: updateKpiDto.samples,

      samplingRate: updateKpiDto.samplingRate,

      processus,

      sprint,
      createdBy,
      description: updateKpiDto.description,
      name: updateKpiDto.name,
    });
  }

  remove(id: Kpi['id']) {
    return this.kpiRepository.remove(id);
  }
}


