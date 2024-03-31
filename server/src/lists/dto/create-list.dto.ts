import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Task } from 'src/tasks/entity/task.entity';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  tasks: Task[];

  @IsString()
  createdDate: string;

  @IsString()
  creatorId: string;
}
