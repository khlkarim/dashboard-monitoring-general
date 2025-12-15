import { ApiProperty } from '@nestjs/swagger';
import { Sprint } from '../../sprints/domain/sprint';
import { User } from '../../users/domain/user';

export class Kpi {
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
    type: () => Number,
    nullable: true,
  })
  targetValue?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  actualValue?: number | null;

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

