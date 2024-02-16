import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taskStatusEnum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
