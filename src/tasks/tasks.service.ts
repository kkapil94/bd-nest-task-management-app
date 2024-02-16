import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatusEnum';
import { CreateTaskDto } from './DTO/createTask.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(getTaskFilterDto: GetTaskFilerDto): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilterDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }

  updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskRepository.updateTaskstatus(id, updateTaskStatusDto);
  }
}
