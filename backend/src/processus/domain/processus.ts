

import { ApiProperty } from '@nestjs/swagger';

export class Processus {
@ApiProperty({
  type: () => 
                  String,
            nullable: true,
})

  description?: string  | null;

@ApiProperty({
  type: () => 
                  String,
            nullable: false,
})

  label: string ;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
