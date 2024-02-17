import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/createTask.dto';
import { TaskStatus } from './taskStatusEnum';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(getTaskFilter: GetTaskFilerDto, user: User): Promise<Task[]> {
    const { status, search } = getTaskFilter;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOneBy({ id, user });
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const res = await this.delete({ id, user });
    if (!res.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskstatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.getTaskById(id, user);
    task.status = status;
    const res = this.save(task);
    return res;
  }
}
