import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { KpiRepository } from './infrastructure/persistence/kpi.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Kpi } from './domain/kpi';

@Injectable()
export class KpisService {
  constructor(
    // Dependencies here
    private readonly kpiRepository: KpiRepository,
  ) {}

  async create(createKpiDto: CreateKpiDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.kpiRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
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

    return this.kpiRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateKpiDto.description,

      name: updateKpiDto.name,
    });
  }

  remove(id: Kpi['id']) {
    return this.kpiRepository.remove(id);
  }
}
