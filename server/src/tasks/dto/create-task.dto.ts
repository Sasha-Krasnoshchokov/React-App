import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Activity } from 'src/activities/entity/activity.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['low', 'medium', 'high', 'highest'])
  priority: string;

  @IsArray()
  activities: Activity[];

  @IsString()
  createdDate: string;

  @IsString()
  creatorId: string;

  @IsString()
  assignedTo: string;
}
