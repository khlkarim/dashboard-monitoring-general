import { Processus } from '../../processus/domain/processus';
import { ApiProperty } from '@nestjs/swagger';
import { Sprint } from '../../sprints/domain/sprint';
import { User } from '../../users/domain/user';

export class Kpi {
  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  samples?: number[] | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })
  samplingRate?: string | null;

  @ApiProperty({
    type: () =>
      Processus,
    nullable: true,
  })
  processus?: Processus | null;

  @ApiProperty({
    type: () => Sprint,
    nullable: true,
  })
  sprint?: Sprint | null;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  createdBy: User;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

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

