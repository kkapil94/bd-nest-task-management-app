import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/createTask.dto';
import { TaskStatus } from './taskStatusEnum';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(getTaskFilter: GetTaskFilerDto): Promise<Task[]> {
    const { status, search } = getTaskFilter;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const res = await this.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskstatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.getTaskById(id);
    task.status = status;
    const res = this.save(task);
    return res;
  }
}
