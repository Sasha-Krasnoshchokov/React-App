import { Inject, Injectable } from '@nestjs/common';

import { Task } from './entity/task.entity';
import { TResponseFromDB } from 'src/models/interfaces';
import { errorHandler } from 'src/helpers/errorHandler';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskActivitiesService } from 'src/activities/activities.service';
import { CreateActivityDto } from 'src/activities/dto/create-activity.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  @Inject(TaskActivitiesService)
  private readonly taskActivityService: TaskActivitiesService;

  private createTask = (task: Task): Task => {
    let newTask: Task = new Task();
    newTask = {
      ...newTask,
      ...task,
    };
    return newTask;
  };

  async getAll(listId?: string): Promise<TResponseFromDB<Task[]>> {
    const tasksResult = await errorHandler({
      action: 'got',
      entity: 'tasks',
      callback: () => this.taskRepository.findBy({ listId }),
    });
    if (!tasksResult?.data || !listId) return tasksResult;

    const activitiesPromises = [];
    tasksResult.data.forEach((task) => {
      activitiesPromises.push(this.taskActivityService.getTaskActivities(task.id));
    });
    const activitiesResult = await Promise.all(activitiesPromises);

    const preparedTasks = {
      ...tasksResult,
      data: tasksResult.data.map((item, ind) => ({
        ...item,
        activities: activitiesResult[ind].data,
      })),
    };

    return preparedTasks;
  }
  getById({ listId, taskId }: { listId: string; taskId: string }): Promise<TResponseFromDB<Task>> {
    return errorHandler({
      action: 'got',
      entity: 'task',
      callback: () =>
        this.taskRepository.findOneBy({
          id: taskId,
          listId,
        }),
    });
  }
  addTask(taskDto: CreateTaskDto): Promise<TResponseFromDB<Task>> {
    this.taskActivityService.addActivity(taskDto);
    return errorHandler({
      action: 'added',
      entity: 'task',
      callback: () => this.taskRepository.save(this.createTask(taskDto)),
    });
  }
  async updateTask(taskDto: CreateTaskDto): Promise<TResponseFromDB<UpdateResult>> {
    taskDto.activities.forEach((item) => {
      this.taskActivityService.addActivity({
        ...taskDto,
        activities: [item],
      });
    });
    const preparedTask = { ...taskDto };
    delete preparedTask.activities;
    return await errorHandler({
      action: 'updated',
      entity: 'task',
      callback: () => this.taskRepository.update({ id: taskDto.id }, this.createTask(preparedTask)),
    });
  }
  async moveTo(data: {
    listId: string;
    taskId: string;
    newListId: string;
    activity: CreateActivityDto;
    status: string;
  }): Promise<TResponseFromDB<Task>> {
    const { listId, taskId, newListId, activity, status } = data;
    const currentTask = await this.getById({ listId, taskId });
    if (!currentTask?.data) {
      return {
        ...currentTask,
        data: null,
      };
    }
    const updatedTask = { ...currentTask.data, listId: newListId, activities: [activity], status };
    const updatedTaskResult = await this.updateTask(updatedTask);
    if (!updatedTaskResult?.data) {
      return {
        ...currentTask,
        data: null,
      };
    }
    return { ...currentTask, data: updatedTask };
  }
  removeTask(id: string): Promise<TResponseFromDB<DeleteResult>> {
    return errorHandler({
      action: 'deleted',
      entity: 'list',
      callback: () => this.taskRepository.delete(id),
    });
  }
}
