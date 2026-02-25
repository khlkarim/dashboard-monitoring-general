import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityRepository } from './infrastructure/persistence/activity.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Activity } from './domain/activity';
import { ProcessusService } from 'src/processus/processus.service';
import { Processus } from 'src/processus/domain/processus';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly processusService: ProcessusService,
    // Dependencies here
    private readonly activityRepository: ActivityRepository,
  ) { }

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createActivityDto: CreateActivityDto
  ) {
    // Do not remove comment below.
    // <creating-property />

    const processus = createActivityDto.processus
      ? await Promise.all(
        createActivityDto.processus.map(async (p) => {
          const processusObject = await this.processusService.findById(p.id);

          if (!processusObject) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                processus: `Processus with ID ${p.id} does not exist`,
              },
            });
          }

          return processusObject;
        })
      )
      : [];

    return this.activityRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      processus,
      endDate: createActivityDto.endDate,

      startDate: createActivityDto.startDate,

      description: createActivityDto.description,

      title: createActivityDto.title,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.activityRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllWithPaginationByProcessusId({
    paginationOptions,
    processusId,
  }: {
    paginationOptions: IPaginationOptions;
    processusId: string;
  }) {
    return this.activityRepository.findAllWithPaginationByProcessusId({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      processusId,
    });
  }

  findById(id: Activity['id']) {
    return this.activityRepository.findById(id);
  }

  findByIds(ids: Activity['id'][]) {
    return this.activityRepository.findByIds(ids);
  }

  async update(
    id: Activity['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateActivityDto: UpdateActivityDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let processus: Processus[] | undefined = undefined;

    if (updateActivityDto.processus) {
      processus = updateActivityDto.processus
        ? await Promise.all(
          updateActivityDto.processus.map(async (p) => {
            const processusObject = await this.processusService.findById(p.id);

            if (!processusObject) {
              throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                  processus: `Processus with ID ${p.id} does not exist`,
                },
              });
            }

            return processusObject;
          })
        )
        : [];
    }

    return this.activityRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      processus,
      endDate: updateActivityDto.endDate,

      startDate: updateActivityDto.startDate,

      description: updateActivityDto.description,

      title: updateActivityDto.title,

    });
  }

  remove(id: Activity['id']) {
    return this.activityRepository.remove(id);
  }
}
