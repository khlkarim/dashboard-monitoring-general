import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiProperty({
    required: false,
    type: () => [String],
    description: 'Array of user IDs to receive this notification',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  recipientIds?: string[];
}
