import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
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
  createdBy: UserDto;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  targetValue?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  actualValue?: number | null;

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

  // Don't forget to use the class-validator decorators in the DTO properties.
}

