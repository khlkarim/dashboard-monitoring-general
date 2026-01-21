import { RiskDto } from '../../risks/dto/risk.dto';




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

export class CreateActionDto {
  @ApiProperty({
    required: true,
    type: () =>
      RiskDto,
  })

  @ValidateNested()
  @Type(() => RiskDto)
  @IsNotEmptyObject()

  risk: RiskDto;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })

  @IsOptional()
  @IsString()

  description?: string | null;

  @ApiProperty({
    required: false,
    type: () =>
      String,
  })

  @IsOptional()
  @IsString()

  title?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
