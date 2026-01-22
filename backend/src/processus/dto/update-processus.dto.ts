import { PartialType } from '@nestjs/swagger';
import { CreateProcessusDto } from './create-processus.dto';

export class UpdateProcessusDto extends PartialType(CreateProcessusDto) { }
