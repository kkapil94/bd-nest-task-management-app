import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/createTask.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getTasks(getTaskFilterDto: GetTaskFilerDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }

  updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.updateTaskstatus(id, updateTaskStatusDto, user);
  }
}
