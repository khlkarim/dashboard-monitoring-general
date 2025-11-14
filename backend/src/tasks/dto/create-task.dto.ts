import { UserDto } from '../../users/dto/user.dto';

import { SprintDto } from '../../sprints/dto/sprint.dto';

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

export class CreateTaskDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  type: number;

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
  reporter: UserDto;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  assignee: UserDto;

  @ApiProperty({
    required: true,
    type: () => SprintDto,
  })
  @ValidateNested()
  @Type(() => SprintDto)
  @IsNotEmptyObject()
  sprint: SprintDto;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dueDate: Date;

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
  title: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
