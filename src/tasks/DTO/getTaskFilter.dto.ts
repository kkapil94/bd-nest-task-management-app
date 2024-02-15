import { TaskStatus } from '../task.model';

export class GetTaskFilerDto {
  status?: TaskStatus;
  search?: string;
}
