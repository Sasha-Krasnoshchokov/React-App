import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryColumn({ type: 'varchar', length: 60 })
  id: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  date: string;

  @Column({ type: 'varchar', length: 60 })
  creatorId: string;
}
