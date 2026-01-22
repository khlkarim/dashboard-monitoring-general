import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Notification } from './domain/notification';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { Subject } from 'rxjs';
import { MessageEvent } from './dto/message-event';

@Injectable()
export class NotificationsService {
  // Notification events tell users that a notification has been created or updated without sending them the notification itself
  private notificationEvents = new Subject<MessageEvent>();

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly usersService: UsersService,
  ) { }

  notify(event: 'created' | 'updated' | 'deleted') {
    this.notificationEvents.next({ 
      data: JSON.stringify({ event }), 
      type: 'notification' 
    });
  }

  subscribe() {
    return this.notificationEvents.asObservable();
  }

  async create(createNotificationDto: CreateNotificationDto) {
    let recipients: User[] | undefined = undefined;
    if (createNotificationDto.recipientIds?.length) {
      recipients = await this.usersService.findByIds(
        createNotificationDto.recipientIds,
      );
    }

    const notification = await this.notificationRepository.create({
      description: createNotificationDto.description,
      title: createNotificationDto.title,
      recipients,
    });

    this.notify('created');
    return notification;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.notificationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllByUserIdWithPagination({
    userId,
    paginationOptions,
  }: {
    userId: User['id'];
    paginationOptions: IPaginationOptions;
  }) {
    return this.notificationRepository.findAllByUserIdWithPagination({
      userId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Notification['id']) {
    return this.notificationRepository.findById(id);
  }

  findByIds(ids: Notification['id'][]) {
    return this.notificationRepository.findByIds(ids);
  }

  async update(
    id: Notification['id'],
    updateNotificationDto: UpdateNotificationDto,
  ) {
    let recipients: User[] | undefined = undefined;
    if (updateNotificationDto.recipientIds?.length) {
      recipients = await this.usersService.findByIds(
        updateNotificationDto.recipientIds,
      );
    }

    const notification = await this.notificationRepository.update(id, {
      description: updateNotificationDto.description,
      title: updateNotificationDto.title,
      recipients,
    });

    this.notify('updated');
    return notification;
  }

  async remove(id: Notification['id']) {
    const notification = await this.notificationRepository.remove(id);
    this.notify('deleted');
    return notification;
  }
}
