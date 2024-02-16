import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../taskStatusEnum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
