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
import { ProcessusService } from './processus.service';
import { CreateProcessusDto } from './dto/create-processus.dto';
import { UpdateProcessusDto } from './dto/update-processus.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Processus } from './domain/processus';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllProcessusDto } from './dto/find-all-processus.dto';

@ApiTags('Processus')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'processus',
  version: '1',
})
export class ProcessusController {
  constructor(private readonly processusService: ProcessusService) {}

  @Post()
  @ApiCreatedResponse({
    type: Processus,
  })
  create(@Body() createProcessusDto: CreateProcessusDto) {
    return this.processusService.create(createProcessusDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Processus),
  })
  async findAll(
    @Query() query: FindAllProcessusDto,
  ): Promise<InfinityPaginationResponseDto<Processus>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 50;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.processusService.findAllWithPagination({
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
    type: Processus,
  })
  findById(@Param('id') id: string) {
    return this.processusService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Processus,
  })
  update(
    @Param('id') id: string,
    @Body() updateProcessusDto: UpdateProcessusDto,
  ) {
    return this.processusService.update(id, updateProcessusDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.processusService.remove(id);
  }
}
