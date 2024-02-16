import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatusEnum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/createTask.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  // getTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilter(getTaskFilterDto: GetTaskFilerDto) {
  //   const { search, status } = getTaskFilterDto;
  //   let tasks = this.tasks;
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  // deleteTask(id: string): Task {
  //   const task = this.getSingleTask(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return task;
  // }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   const { status } = updateTaskStatusDto;
  //   const task = this.getSingleTask(id);
  //   task.status = status;
  //   return task;
  // }
}
