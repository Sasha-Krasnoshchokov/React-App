import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './entity/task.entity';
import { TResponseFromDB } from 'src/models/interfaces';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTaskActivityDto } from 'src/activities/dto/create-taskActivity.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(): Promise<TResponseFromDB<Task[]>> {
    return this.tasksService.getAll();
  }
  @Get()
  async getById(@Query() { listId, taskId }: { listId: string; taskId: string }): Promise<TResponseFromDB<Task>> {
    return this.tasksService.getById({ listId, taskId });
  }
  @Post()
  async addTask(@Body() body: CreateTaskDto): Promise<TResponseFromDB<Task> | null> {
    return this.tasksService.addTask(body);
  }
  @Put()
  async updateTask(@Body() body: CreateTaskDto): Promise<TResponseFromDB<UpdateResult>> {
    return this.tasksService.updateTask(body);
  }
  @Put('move')
  async moveTo(
    @Body()
    body: {
      listId: string;
      taskId: string;
      newListId: string;
      activity: CreateTaskActivityDto;
      status: string;
    },
  ): Promise<TResponseFromDB<Task>> {
    return this.tasksService.moveTo(body);
  }
  @Delete(':id')
  async removeTask(@Param() id: string): Promise<TResponseFromDB<DeleteResult>> {
    return this.tasksService.removeTask(id);
  }
}
