




  import {
    // decorators here


  IsString,




  IsOptional,



















  IsDate,

  } from 'class-validator';

  import { 
    // decorators here
  ApiProperty,

  } from '@nestjs/swagger';



  import {
    // decorators here

  Transform,

  } from 'class-transformer';

export class CreateActivityDto {
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
