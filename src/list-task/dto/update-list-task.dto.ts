import { PartialType } from '@nestjs/mapped-types';
import { CreateListTaskDto } from './create-list-task.dto';

export class UpdateListTaskDto extends PartialType(CreateListTaskDto) {}
