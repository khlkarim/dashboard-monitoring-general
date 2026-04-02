import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
