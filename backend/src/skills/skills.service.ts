



import { 
  // common
  Injectable,




} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillRepository } from './infrastructure/persistence/skill.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Skill } from './domain/skill';

@Injectable()
export class SkillsService {
  constructor(


    // Dependencies here
    private readonly skillRepository: SkillRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSkillDto: CreateSkillDto
  ) {
    // Do not remove comment below.
    // <creating-property />
  
  

    return this.skillRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
  description: createSkillDto.description,

  title: createSkillDto.title,

    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.skillRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Skill['id']) {
    return this.skillRepository.findById(id);
  }

  findByIds(ids: Skill['id'][]) {
    return this.skillRepository.findByIds(ids);
  }

  async update(
    id: Skill['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateSkillDto: UpdateSkillDto,
  ) {
    // Do not remove comment below.
    // <updating-property />



    return this.skillRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
  description: updateSkillDto.description,

  title: updateSkillDto.title,

    });
  }

  remove(id: Skill['id']) {
    return this.skillRepository.remove(id);
  }
}
