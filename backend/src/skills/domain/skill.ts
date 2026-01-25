

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Skill {
  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })

  description?: string | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })

  title?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => [User],
  })
  users?: User[];
}
