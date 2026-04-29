import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Sprint } from '../../sprints/domain/sprint';
import { Processus } from '../../processus/domain/processus';

export class Kpi {
  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })
  samplingMethod?: string | null;

  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  samples?: number[] | null;

  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  targetSamples?: number[] | null;

  @ApiProperty({
    type: () =>
      Date,
    nullable: true,
  })
  sampleDates?: Date[] | null;

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
  manager: User;

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

