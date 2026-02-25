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
import { RisksService } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Risk } from './domain/risk';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRisksDto } from './dto/find-all-risks.dto';

@ApiTags('Risks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'risks',
  version: '1',
})
export class RisksController {
  constructor(private readonly risksService: RisksService) { }

  @Post()
  @ApiCreatedResponse({
    type: Risk,
  })
  create(@Body() createRiskDto: CreateRiskDto) {
    return this.risksService.create(createRiskDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Risk),
  })
  async findAll(
    @Query() query: FindAllRisksDto,
  ): Promise<InfinityPaginationResponseDto<Risk>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 1000;

    return infinityPagination(
      await this.risksService.findAllWithPagination({
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
    type: Risk,
  })
  findById(@Param('id') id: string) {
    return this.risksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Risk,
  })
  update(
    @Param('id') id: string,
    @Body() updateRiskDto: UpdateRiskDto,
  ) {
    return this.risksService.update(id, updateRiskDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.risksService.remove(id);
  }
}
