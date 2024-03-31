import { Controller, Get, Post, Body } from '@nestjs/common';
import { ActivitiesService, TaskActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { TResponseFromDB } from 'src/models/interfaces';
import { Activity } from './entity/activity.entity';
import { TaskActivity } from './entity/task-activity.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getActivities(): Promise<TResponseFromDB<Activity[]>> {
    return this.activitiesService.getActivities();
  }

  @Post()
  async addActivity(@Body() body: CreateActivityDto): Promise<TResponseFromDB<Activity>> {
    return this.activitiesService.addActivity(body);
  }
}

@Controller('taskActivities')
export class TaskActivitiesController {
  constructor(private readonly taskActivitiesService: TaskActivitiesService) {}

  @Get()
  async getTaskActivities(taskId: string): Promise<TResponseFromDB<TaskActivity[]>> {
    return this.taskActivitiesService.getTaskActivities(taskId);
  }

  @Post()
  async addATaskActivity(@Body() body: CreateTaskDto): Promise<TResponseFromDB<TaskActivity>> {
    return this.taskActivitiesService.addActivity(body);
  }
}
