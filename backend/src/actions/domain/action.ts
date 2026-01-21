import { Risk } from '../../risks/domain/risk';
import { ApiProperty } from '@nestjs/swagger';

export class Action {
  @ApiProperty({
    type: () => Risk,
    nullable: false,
  })
  risk: Risk;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
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
