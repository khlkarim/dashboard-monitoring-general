import {
  // decorators here
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRiskDto {
  @ApiProperty({
    required: false,
    type: () =>
      Number,
  })
  @IsOptional()
  @IsNumber()
  detection?: number | null;

  @ApiProperty({
    required: false,
    type: () =>
      Number,
  })
  @IsOptional()
  @IsNumber()
  occurrence?: number | null;

  @ApiProperty({
    required: false,
    type: () =>
      Number,
  })
  @IsOptional()
  @IsNumber()
  severity?: number | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  title?: string | null;
}
