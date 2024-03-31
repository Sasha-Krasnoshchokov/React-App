import { Injectable } from '@nestjs/common';

import { CreateActivityDto } from './dto/create-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entity/activity.entity';
import { Repository } from 'typeorm';
import { errorHandler } from 'src/helpers/errorHandler';
import { TResponseFromDB } from 'src/models/interfaces';
import { TaskActivity } from './entity/task-activity.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  getActivities(): Promise<TResponseFromDB<Activity[]>> {
    return errorHandler({ action: 'got', entity: 'activities', callback: () => this.activityRepository.find() });
  }
  addActivity(activityDto: CreateActivityDto): Promise<TResponseFromDB<Activity>> {
    let activity = new Activity();
    activity = { ...activity, ...activityDto };
    return errorHandler({
      action: 'added',
      entity: 'activity',
      callback: () => this.activityRepository.save(activity),
    });
  }
}

@Injectable()
export class TaskActivitiesService {
  constructor(
    @InjectRepository(TaskActivity)
    private taskActivityRepository: Repository<TaskActivity>,
  ) {}

  getTaskActivities(taskId: string): Promise<TResponseFromDB<TaskActivity[]>> {
    return errorHandler({
      action: 'got',
      entity: 'activities',
      callback: () => this.taskActivityRepository.findBy({ taskId }),
    });
  }
  addActivity(taskDto: CreateTaskDto): Promise<TResponseFromDB<TaskActivity>> {
    let taskActivity = new TaskActivity();
    const [currentActivity] = taskDto.activities;
    taskActivity = { ...taskActivity, ...currentActivity, taskId: taskDto.id };
    return errorHandler({
      action: 'added',
      entity: 'activity',
      callback: () => this.taskActivityRepository.save(taskActivity),
    });
  }
}
