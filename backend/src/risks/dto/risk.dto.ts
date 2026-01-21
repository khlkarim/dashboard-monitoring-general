import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RiskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
