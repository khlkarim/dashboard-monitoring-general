




  import {
    // decorators here


  IsString,




  IsOptional,



















  IsDate,
  ValidateNested,
  IsNotEmptyObject,

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
import { ProcessusDto } from 'src/processus/dto/processus.dto';

export class CreateActivityDto {
  @ValidateNested()
  @Type(() => ProcessusDto)
  @IsNotEmptyObject()
  processus: ProcessusDto;

  @ApiProperty({
    required: false,
    type: () => 
                        Date,
                })

      @IsOptional()
              @Transform(({ value }) => new Date(value))
      @IsDate()
      
  endDate?: Date  | null;

  @ApiProperty({
    required: false,
    type: () => 
                        Date,
                })

      @IsOptional()
              @Transform(({ value }) => new Date(value))
      @IsDate()
      
  startDate?: Date  | null;

  @ApiProperty({
    required: false,
    type: () => 
                        String,
                })

      @IsOptional()
              @IsString()
      
  description?: string  | null;

  @ApiProperty({
    required: false,
    type: () => 
                        String,
                })

      @IsOptional()
              @IsString()
      
  title?: string  | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
