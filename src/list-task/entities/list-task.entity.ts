import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ListTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 350 })
  name: string;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.listTasks)
  user: User;
}
