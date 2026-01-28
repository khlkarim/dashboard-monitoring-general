


import { ApiProperty } from '@nestjs/swagger';

export class TaskStatus {
@ApiProperty({
  type: () => 
                  Number,
            nullable: true,
})

  precedence?: number  | null;

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
