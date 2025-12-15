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
  Request,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { KpisService } from './kpis.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Kpi } from './domain/kpi';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllKpisDto } from './dto/find-all-kpis.dto';

@ApiTags('Kpis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'kpis',
  version: '1',
})
export class KpisController {
  constructor(private readonly kpisService: KpisService) { }

  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Post()
  @ApiCreatedResponse({
    type: Kpi,
  })
  create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto);
  }

  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Kpi),
  })
  async findAll(
    @Query() query: FindAllKpisDto,
  ): Promise<InfinityPaginationResponseDto<Kpi>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.kpisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Kpi,
  })
  findById(@Param('id') id: string) {
    return this.kpisService.findById(id);
  }

  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Kpi,
  })
  async update(
    @Param('id') id: string,
    @Body() updateKpiDto: UpdateKpiDto,
    @Request() request,
  ) {
    // If user is Member, check if they are the creator
    if (request.user.role.id === RoleEnum.member) {
      const kpi = await this.kpisService.findById(id);
      if (!kpi) {
        throw new NotFoundException('KPI not found');
      }
      if (kpi.createdBy.id !== request.user.id) {
        throw new ForbiddenException('You can only update KPIs created by you');
      }
    }
    return this.kpisService.update(id, updateKpiDto);
  }

  @Roles(RoleEnum.member, RoleEnum.president, RoleEnum.administrator)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async remove(@Param('id') id: string, @Request() request) {
    // If user is Member, check if they are the creator
    if (request.user.role.id === RoleEnum.member) {
      const kpi = await this.kpisService.findById(id);
      if (!kpi) {
        throw new NotFoundException('KPI not found');
      }
      if (kpi.createdBy.id !== request.user.id) {
        throw new ForbiddenException('You can only delete KPIs created by you');
      }
    }
    return this.kpisService.remove(id);
  }
}

