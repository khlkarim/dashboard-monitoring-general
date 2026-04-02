// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTaskStatusDto } from './create-task-status.dto';

export class UpdateTaskStatusDto extends PartialType(CreateTaskStatusDto) {}
