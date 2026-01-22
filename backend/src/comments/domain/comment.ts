import { Task } from '../../tasks/domain/task';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({
    type: () =>
      Task,
    nullable: true,
  })

  task?: Task | null;

  @ApiProperty({
    type: () =>
      User,
    nullable: true,
  })
  author?: User | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
