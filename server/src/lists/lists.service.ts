import { Inject, Injectable } from '@nestjs/common';
import { List } from './entity/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { TResponseFromDB } from 'src/models/interfaces';
import { errorHandler } from 'src/helpers/errorHandler';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ListsService {
  constructor(@InjectRepository(List) private readonly listRepository: Repository<List>) {}

  @Inject(TasksService)
  private readonly tasksService: TasksService;

  private createList = (listDto: List): List => {
    let newList: List = new List();
    newList = {
      ...newList,
      ...listDto,
    };
    return newList;
  };

  async getAll(): Promise<TResponseFromDB<CreateListDto[]>> {
    const listsResult = await errorHandler({
      action: 'got',
      entity: 'lists',
      callback: () => this.listRepository.find(),
    });
    if (!listsResult?.data) return { ...listsResult, data: null };
    const tasksResult = await this.tasksService.getAll();
    if (!tasksResult?.data) return { ...listsResult, data: listsResult.data.map((list) => ({ ...list, tasks: [] })) };
    const lists = listsResult.data;
    const tasks = tasksResult.data;
    const preparedLists = lists
      .sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
      .map((list) => ({ ...list, tasks: tasks.filter((task) => task.listId === list.id) }));
    return {
      ...listsResult,
      data: preparedLists,
    };
  }
  async getById(id: string): Promise<TResponseFromDB<CreateListDto>> {
    const currentList = await errorHandler({
      action: 'got',
      entity: 'list',
      callback: () => this.listRepository.findOneBy({ id }),
    });
    if (!currentList?.data) return { ...currentList, data: null };
    const tasksResult = await this.tasksService.getAll(id);
    if (!tasksResult?.data) return { ...currentList, data: { ...currentList.data, tasks: [] } };
    return {
      ...currentList,
      data: {
        ...currentList.data,
        tasks: tasksResult.data,
      },
    };
  }
  addList(listDto: CreateListDto): Promise<TResponseFromDB<List>> {
    return errorHandler({
      action: 'added',
      entity: 'list',
      callback: () => this.listRepository.save(this.createList(listDto)),
    });
  }
  updateList(listDto: CreateListDto): Promise<TResponseFromDB<UpdateResult>> {
    const preparedList = { ...listDto };
    delete preparedList.tasks;
    return errorHandler({
      action: 'updated',
      entity: 'list',
      callback: () => this.listRepository.update(listDto.id, this.createList(preparedList)),
    });
  }
  async removeList(id: string): Promise<TResponseFromDB<DeleteResult>> {
    const currentList = await errorHandler({
      action: 'got',
      entity: 'list',
      callback: () => this.listRepository.findOneBy({ id }),
    });
    if (currentList?.data) {
      const activitiesPromises = [];
      const tasksResult = await this.tasksService.getAll(currentList.data.id);
      if (tasksResult?.data && tasksResult.data.length > 0) {
        tasksResult.data.forEach((task) => {
          activitiesPromises.push(this.tasksService.removeTask(task.id));
        });
        await Promise.all(activitiesPromises);
      }
    }
    return errorHandler({ action: 'deleted', entity: 'list', callback: () => this.listRepository.delete(id) });
  }
}
