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
import { SprintsService } from './sprints.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Sprint } from './domain/sprint';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSprintsDto } from './dto/find-all-sprints.dto';

@ApiTags('Sprints')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'sprints',
  version: '1',
})
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) { }

  @Post()
  @ApiCreatedResponse({
    type: Sprint,
  })
  @Roles(RoleEnum.president, RoleEnum.administrator)
  create(@Body() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Sprint),
  })
  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  async findAll(
    @Query() query: FindAllSprintsDto,
  ): Promise<InfinityPaginationResponseDto<Sprint>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.sprintsService.findAllWithPagination({
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
    type: Sprint,
  })
  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  findOne(@Param('id') id: string) {
    return this.sprintsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Sprint,
  })
  @Roles(RoleEnum.president, RoleEnum.administrator)
  update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
    return this.sprintsService.update(id, updateSprintDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @Roles(RoleEnum.president, RoleEnum.administrator)
  remove(@Param('id') id: string) {
    return this.sprintsService.remove(id);
  }
}
