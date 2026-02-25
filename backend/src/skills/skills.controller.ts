import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Skill } from './domain/skill';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSkillsDto } from './dto/find-all-skills.dto';

@ApiTags('Skills')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'skills',
  version: '1',
})
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  @ApiCreatedResponse({
    type: Skill,
  })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Skill),
  })
  async findAll(
    @Query() query: FindAllSkillsDto,
  ): Promise<InfinityPaginationResponseDto<Skill>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 1000;

    return infinityPagination(
      await this.skillsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Skill,
  })
  findById(@Param('id') id: string) {
    return this.skillsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Skill,
  })
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
