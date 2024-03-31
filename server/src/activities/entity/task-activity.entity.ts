import { Column, Entity } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class TaskActivity extends Activity {
  @Column({ type: 'varchar', length: 60 })
  taskId: string;
}
