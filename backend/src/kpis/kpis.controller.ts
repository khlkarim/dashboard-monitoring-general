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

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
  @Post()
  @ApiCreatedResponse({
    type: Kpi,
  })
  create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto);
  }

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
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

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
  @Get('sprint/:sprintId')
  @ApiParam({
    name: 'sprintId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Kpi),
  })
  async findAllBySprintId(
    @Query() query: FindAllKpisDto,
    @Param('sprintId') sprintId: string,
  ): Promise<InfinityPaginationResponseDto<Kpi>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.kpisService.findAllBySprintIdWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        sprintId,
      }),
      { page, limit },
    );
  }

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
  @Get('processus/:processusId')
  @ApiParam({
    name: 'processusId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Kpi),
  })
  async findAllByProcessusId(
    @Query() query: FindAllKpisDto,
    @Param('processusId') processusId: string,
  ): Promise<InfinityPaginationResponseDto<Kpi>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.kpisService.findAllByProcessusIdWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        processusId,
      }),
      { page, limit },
    );
  }

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
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

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
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
    if (request.user.role.id === RoleEnum.MEMBER) {
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

  @Roles(RoleEnum.MEMBER, RoleEnum.PRESIDENT, RoleEnum.ADMINISTRATOR)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async remove(@Param('id') id: string, @Request() request) {
    // If user is Member, check if they are the creator
    if (request.user.role.id === RoleEnum.MEMBER) {
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

