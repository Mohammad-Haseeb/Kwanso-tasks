import { IsString } from 'class-validator';
export class CreateListTaskDto {
  @IsString()
  name: string;
}
