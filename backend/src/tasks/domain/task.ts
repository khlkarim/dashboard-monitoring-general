import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { TaskStatusEnum } from './task-status.enum';
import { Sprint } from '../../sprints/domain/sprint';
import { Comment } from '../../comments/domain/comment';
import { Processus } from '../../processus/domain/processus';

export class Task {
  @ApiProperty({
    type: () =>
      Date,
    nullable: true,
  })
  estimatedEndDate?: Date | null;

  @ApiProperty({
    type: () =>
      Date,
    nullable: true,
  })

  estimatedStartDate?: Date | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })

  expectedDelivrable?: string | null;

  @ApiProperty({
    type: () =>
      Processus,
    nullable: true,
  })
  processus?: Processus | null;

  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  criticality?: number | null;

  @ApiProperty({
    type: () =>
      Date,
    nullable: true,
  })
  startDate?: Date | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })
  deliverable?: string | null;

  @ApiProperty({
    enum: TaskStatusEnum,
    nullable: false,
  })
  status: TaskStatusEnum;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  reporter: User;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  assignee: User;

  @ApiProperty({
    type: () => Sprint,
    nullable: false,
  })
  sprint: Sprint;

  @ApiProperty({
    type: () => [Comment],
  })
  comments?: Comment[];

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  dueDate: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
