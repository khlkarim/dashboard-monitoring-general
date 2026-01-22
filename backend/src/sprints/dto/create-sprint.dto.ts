import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
  IsNumber,
  IsEnum,
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
import { SprintStatus } from '../domain/sprint-status.enum';

export class CreateSprintDto {
  @ApiProperty({
    required: false,
    type: () =>
      Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()

  validationDate?: Date | null;

  @ApiProperty({
    required: true,
    enum: SprintStatus,
  })
  @IsEnum(SprintStatus)
  status: SprintStatus;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  createdBy: UserDto;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  goal?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;
}
