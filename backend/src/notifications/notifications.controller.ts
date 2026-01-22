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
  Sse,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './domain/notification';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';

@ApiTags('Notifications')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Sse('subscribe')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  subscribe() {
    return this.notificationsService.subscribe();
  }

  @Post()
  @ApiCreatedResponse({
    type: Notification,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Notification),
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query() query: FindAllNotificationsDto,
  ): Promise<InfinityPaginationResponseDto<Notification>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.notificationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('user/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Notification),
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAllByUserId(
    @Param('userId') userId: string,
    @Query() query: FindAllNotificationsDto,
  ): Promise<InfinityPaginationResponseDto<Notification>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.notificationsService.findAllByUserIdWithPagination({
        userId,
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
    type: Notification,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: string) {
    return this.notificationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Notification,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
