import {
  // decorators here
  IsString,
  IsOptional,
  IsDate,
  ValidateNested
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { ProcessusDto } from 'src/processus/dto/processus.dto';

export class CreateActivityDto {
  @ApiProperty({
    required: false,
    type: () =>
      ProcessusDto,
  })
  @Type(() => ProcessusDto)
  @IsOptional()
  @ValidateNested({ each: true })
  processus?: ProcessusDto[];

  @ApiProperty({
    required: false,
    type: () =>
      Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () =>
      Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate?: Date | null;

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
