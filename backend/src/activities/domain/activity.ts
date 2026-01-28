



import { ApiProperty } from '@nestjs/swagger';

export class Activity {
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
