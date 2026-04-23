import { ProcessusDto } from '../../processus/dto/processus.dto';

import {
  // decorators here
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateRiskDto {
  @ApiProperty({
    required: false,
    type: () =>
      ProcessusDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessusDto)
  @IsNotEmptyObject()
  processus?: ProcessusDto | null;

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
