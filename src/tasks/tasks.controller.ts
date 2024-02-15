import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './DTO/createTask.dto';
import { GetTaskFilerDto } from './DTO/getTaskFilter.dto';
import { UpdateTaskStatusDto } from './DTO/updateTaskStatus.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() getTaskFilterDto: GetTaskFilerDto): Task[] {
    if (Object.keys(getTaskFilterDto).length) {
      return this.tasksService.getTasksWithFilter(getTaskFilterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get('/:id')
  getSingleTask(@Param('id') id: string): Task {
    return this.tasksService.getSingleTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
