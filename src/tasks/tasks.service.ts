import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/createTask.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(getTaskFilterDto: GetTaskFilerDto) {
    const { search, status } = getTaskFilterDto;
    let tasks = this.tasks;
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  getSingleTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, status = TaskStatus.OPEN } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: status,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getSingleTask(id);
    task.status = status;
    return task;
  }
}
