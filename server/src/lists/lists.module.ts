import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/list.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forFeature([List])],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
