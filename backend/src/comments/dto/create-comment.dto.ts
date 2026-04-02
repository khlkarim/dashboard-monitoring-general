import { TaskDto } from '../../tasks/dto/task.dto';

import { UserDto } from '../../users/dto/user.dto';
import {
  // decorators here
  IsString,
  IsOptional,
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

export class CreateCommentDto {
  @ApiProperty({
    required: false,
    type: () =>
      TaskDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TaskDto)
  @IsNotEmptyObject()

  task?: TaskDto | null;

  @ApiProperty({
    required: false,
    type: () =>
      UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  author?: UserDto | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })
  @IsOptional()
  @IsString()
  content?: string | null;
}
