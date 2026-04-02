import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../tasks/domain/task';
import { Kpi } from '../../kpis/domain/kpi';
import { SprintStatus } from './sprint-status.enum';

export class Sprint {
  @ApiProperty({
    type: () =>
      Date,
    nullable: true,
  })
  validationDate?: Date | null;

  @ApiProperty({
    enum: SprintStatus,
    nullable: false,
  })
  status: SprintStatus;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  createdBy: User;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  endDate: Date;

  @ApiProperty({
    type: () => [Task],
  })
  tasks?: Task[];

  @ApiProperty({
    type: () => [Kpi],
  })
  kpis?: Kpi[];

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  startDate: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  goal?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
