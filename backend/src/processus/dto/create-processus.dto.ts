import {
  // decorators here
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';


export class CreateProcessusDto {
  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () =>
      String,
  })
  @IsString()
  label: string;
}
