



import { 
  // common
  Injectable,




} from '@nestjs/common';
import { CreateProcessusDto } from './dto/create-processus.dto';
import { UpdateProcessusDto } from './dto/update-processus.dto';
import { ProcessusRepository } from './infrastructure/persistence/processus.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Processus } from './domain/processus';

@Injectable()
export class ProcessusService {
  constructor(


    // Dependencies here
    private readonly processusRepository: ProcessusRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createProcessusDto: CreateProcessusDto
  ) {
    // Do not remove comment below.
    // <creating-property />
  
  

    return this.processusRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
  description: createProcessusDto.description,

  label: createProcessusDto.label,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.processusRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Processus['id']) {
    return this.processusRepository.findById(id);
  }

  findByIds(ids: Processus['id'][]) {
    return this.processusRepository.findByIds(ids);
  }

  async update(
    id: Processus['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateProcessusDto: UpdateProcessusDto,
  ) {
    // Do not remove comment below.
    // <updating-property />



    return this.processusRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
  description: updateProcessusDto.description,

  label: updateProcessusDto.label,

    });
  }

  remove(id: Processus['id']) {
    return this.processusRepository.remove(id);
  }
}
