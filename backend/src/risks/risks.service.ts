import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { RiskRepository } from './infrastructure/persistence/risk.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Risk } from './domain/risk';

@Injectable()
export class RisksService {
  constructor(
    // Dependencies here
    private readonly riskRepository: RiskRepository,
  ) { }

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRiskDto: CreateRiskDto
  ) {
    // Do not remove comment below.
    // <creating-property />
    return this.riskRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      detection: createRiskDto.detection,

      occurrence: createRiskDto.occurrence,

      severity: createRiskDto.severity,

      description: createRiskDto.description,

      title: createRiskDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.riskRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Risk['id']) {
    return this.riskRepository.findById(id);
  }

  findByIds(ids: Risk['id'][]) {
    return this.riskRepository.findByIds(ids);
  }

  async update(
    id: Risk['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateRiskDto: UpdateRiskDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    return this.riskRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      detection: updateRiskDto.detection,

      occurrence: updateRiskDto.occurrence,

      severity: updateRiskDto.severity,

      description: updateRiskDto.description,

      title: updateRiskDto.title,

    });
  }

  remove(id: Risk['id']) {
    return this.riskRepository.remove(id);
  }
}
