// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateProcessusDto } from './create-processus.dto';

export class UpdateProcessusDto extends PartialType(CreateProcessusDto) {}
