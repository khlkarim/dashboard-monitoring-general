import { ProcessusDto } from '../../processus/dto/processus.dto';
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { SprintDto } from '../../sprints/dto/sprint.dto';
import { UserDto } from '../../users/dto/user.dto';

export class CreateKpiDto {
  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  samplingMethod?: string | null;

  @ApiProperty({
    required: false,
    type: () =>
      Number,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  samples?: number[] | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  samplingRate?: string | null;

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
    type: () => SprintDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SprintDto)
  sprint?: SprintDto | null;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  manager: UserDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;
}