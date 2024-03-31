import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entity/list.entity';
import { TResponseFromDB } from 'src/models/interfaces';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsServices: ListsService) {}

  @Get()
  async getAll(): Promise<TResponseFromDB<CreateListDto[]>> {
    return this.listsServices.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<TResponseFromDB<CreateListDto>> {
    return this.listsServices.getById(id);
  }
  @Post()
  async addList(@Body() body: CreateListDto): Promise<TResponseFromDB<List>> {
    return this.listsServices.addList(body);
  }
  @Put(':id')
  async updateList(@Body() body: CreateListDto): Promise<TResponseFromDB<UpdateResult>> {
    return this.listsServices.updateList(body);
  }
  @Delete(':id')
  async removeList(@Param('id') id: string): Promise<TResponseFromDB<DeleteResult>> {
    return this.listsServices.removeList(id);
  }
}
