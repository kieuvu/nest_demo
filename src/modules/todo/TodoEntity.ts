import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/UserEntity';
import { CategoryEntity } from '../category/CategoryEntity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: true,
  })
  isDone: string;

  @ManyToOne(
    (): typeof UserEntity => UserEntity,
    (user: UserEntity): TodoEntity[] => user.todos,
  )
  user: UserEntity;

  @ManyToOne(
    (): typeof CategoryEntity => CategoryEntity,
    (category: CategoryEntity): TodoEntity[] => category.todos,
  )
  category: CategoryEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
