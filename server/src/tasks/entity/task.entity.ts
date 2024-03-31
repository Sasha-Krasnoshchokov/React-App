import { List } from 'src/lists/entity/list.entity';
import { EPriority } from 'src/models/types';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'varchar', length: 60 })
  id: string;

  @Column({ type: 'varchar', length: 60 })
  @OneToOne(() => List, (list) => list.id)
  listId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  dueDate: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'enum', enum: EPriority })
  priority: string;

  @Column({ type: 'varchar', length: 120 })
  createdDate: string;

  @Column({ type: 'varchar', length: 60 })
  creatorId: string;

  @Column({ type: 'varchar', length: 60 })
  assignedTo: string;
}
