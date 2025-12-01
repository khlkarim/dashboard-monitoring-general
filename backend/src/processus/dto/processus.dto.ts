import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
