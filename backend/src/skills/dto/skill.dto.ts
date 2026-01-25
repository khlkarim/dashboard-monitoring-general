import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SkillDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
