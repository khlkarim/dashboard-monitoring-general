import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'task',
})
export class TaskEntity extends EntityRelationalHelper {
  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  reporter: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  assignee: UserEntity;

  @ManyToOne(() => SprintEntity, { eager: true, nullable: false })
  sprint: SprintEntity;

  @Column({
    nullable: false,
    type: Date,
  })
  dueDate: Date;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
