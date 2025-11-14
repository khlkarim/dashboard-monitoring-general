import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
  IsNumber,
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

export class CreateSprintDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  status: number;

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

  // Don't forget to use the class-validator decorators in the DTO properties.
}
