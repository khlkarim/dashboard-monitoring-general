import { User } from '../../users/domain/user';
import { Sprint } from '../../sprints/domain/sprint';
import { ApiProperty } from '@nestjs/swagger';

export class Task {
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
