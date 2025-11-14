import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Sprint {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  status: number;

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
