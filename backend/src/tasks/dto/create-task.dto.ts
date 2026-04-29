import { ProcessusDto } from '../../processus/dto/processus.dto';

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
import { TaskStatusEnum } from '../domain/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({
    required: false,
    type: () =>
      Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  estimatedEndDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () =>
      Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  estimatedStartDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  expectedDelivrable?: string | null;

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
  criticality?: number | null;

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
  deliverable?: string | null;

  @ApiProperty({
    required: true,
    enum: TaskStatusEnum,
  })
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

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
}
