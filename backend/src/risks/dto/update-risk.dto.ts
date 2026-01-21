// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRiskDto } from './create-risk.dto';

export class UpdateRiskDto extends PartialType(CreateRiskDto) {}
