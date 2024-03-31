import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryColumn({ type: 'varchar', length: 60 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  createdDate: string;

  @Column({ type: 'varchar', length: 60 })
  creatorId: string;
}
