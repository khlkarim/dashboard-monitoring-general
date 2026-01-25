import { RisksService } from '../risks/risks.service';
import { Risk } from '../risks/domain/risk';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ActionRepository } from './infrastructure/persistence/action.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Action } from './domain/action';
import { isUUID } from 'class-validator';

@Injectable()
export class ActionsService {
  constructor(
    // Dependencies here
    private readonly riskService: RisksService,
    private readonly actionRepository: ActionRepository,
  ) { }

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createActionDto: CreateActionDto
  ) {
    // Do not remove comment below.
    // <creating-property />

    const riskObject = await this.riskService.findById(
      createActionDto.risk.id,
    );
    if (!riskObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          risk: 'notExists',
        },
      });
    }
    const risk = riskObject;

    return this.actionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      type: createActionDto.type,

      risk,

      description: createActionDto.description,

      title: createActionDto.title,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.actionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllByRiskIdWithPagination({
    paginationOptions,
    riskId,
  }: {
    paginationOptions: IPaginationOptions;
    riskId: string;
  }) {
    if (!isUUID(riskId)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          riskId: 'invalid',
        },
      });
    }

    return this.actionRepository.findAllByRiskIdWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      riskId,
    });
  }

  findById(id: Action['id']) {
    return this.actionRepository.findById(id);
  }

  findByIds(ids: Action['id'][]) {
    return this.actionRepository.findByIds(ids);
  }

  async update(
    id: Action['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateActionDto: UpdateActionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let risk: Risk | undefined = undefined;

    if (updateActionDto.risk) {
      const riskObject = await this.riskService.findById(
        updateActionDto.risk.id,
      );
      if (!riskObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            risk: 'notExists',
          },
        });
      }
      risk = riskObject;
    }

    return this.actionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      type: updateActionDto.type,

      risk,

      description: updateActionDto.description,

      title: updateActionDto.title,

    });
  }

  remove(id: Action['id']) {
    return this.actionRepository.remove(id);
  }
}
