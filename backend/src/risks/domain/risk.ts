import { ApiProperty } from '@nestjs/swagger';
import { Action } from 'src/actions/domain/action';

export class Risk {
  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  detection?: number | null;

  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  occurrence?: number | null;

  @ApiProperty({
    type: () =>
      Number,
    nullable: true,
  })
  severity?: number | null;

  @ApiProperty({
    type: () =>
      Action,
  })
  actions?: Action[];

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
}
