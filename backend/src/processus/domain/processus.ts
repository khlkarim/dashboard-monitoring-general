import { ApiProperty } from '@nestjs/swagger';
import { Kpi } from '../../kpis/domain/kpi';

export class Processus {
  @ApiProperty({
    type: () =>
      String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () =>
      String,
    nullable: false,
  })
  label: string;

  @ApiProperty({
    type: () => [Kpi],
  })
  kpis?: Kpi[];

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
