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
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllKpisDto } from './dto/find-all-kpis.dto';

@ApiTags('Kpis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'kpis',
  version: '1',
})
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Post()
  @ApiCreatedResponse({
    type: Kpi,
  })
  create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto);
  }

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

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Kpi,
  })
  update(@Param('id') id: string, @Body() updateKpiDto: UpdateKpiDto) {
    return this.kpisService.update(id, updateKpiDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.kpisService.remove(id);
  }
}
