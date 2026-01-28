



import { ApiProperty } from '@nestjs/swagger';
import { Processus } from 'src/processus/domain/processus';

export class Activity {
  @ApiProperty({
    type: () => Processus,
    nullable: false,
  })
  processus: Processus;

@ApiProperty({
  type: () => 
                  Date,
            nullable: true,
})

  endDate?: Date  | null;

@ApiProperty({
  type: () => 
                  Date,
            nullable: true,
})

  startDate?: Date  | null;

@ApiProperty({
  type: () => 
                  String,
            nullable: true,
})

  description?: string  | null;

@ApiProperty({
  type: () => 
                  String,
            nullable: true,
})

  title?: string  | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
