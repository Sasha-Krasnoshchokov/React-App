import { Module } from '@nestjs/common';
import { ActivitiesService, TaskActivitiesService } from './activities.service';
import { ActivitiesController, TaskActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entity/activity.entity';
import { TaskActivity } from './entity/task-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, TaskActivity])],
  controllers: [ActivitiesController, TaskActivitiesController],
  providers: [ActivitiesService, TaskActivitiesService],
  exports: [TaskActivitiesService],
})
export class ActivitiesModule {}
