import { ProcessusEntity } from '../../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { CommentEntity } from '../../../../../comments/infrastructure/persistence/relational/entities/comment.entity';

import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { TaskStatusEnum } from '../../../../domain/task-status.enum';

@Entity({
  name: 'task',
})
export class TaskEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
      Date,
  })
  estimatedEndDate?: Date | null;

  @Column({
    nullable: true,
    type:
      Date,
  })
  estimatedStartDate?: Date | null;

  @Column({
    nullable: true,
    type:
      String,
  })
  expectedDelivrable?: string | null;

  @ManyToOne(
    () => ProcessusEntity,
    { eager: true, nullable: true }
  )
  processus?: ProcessusEntity | null;

  @Column({
    nullable: true,
    type:
      Number,
  })
  criticality?: number | null;

  @Column({
    nullable: true,
    type:
      Date,
  })
  startDate?: Date | null;

  @Column({
    nullable: true,
    type:
      String,
  })
  deliverable?: string | null;

  @Column({
    nullable: false,
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.TODO,
  })
  status: TaskStatusEnum;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE', nullable: false })
  reporter: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE', nullable: false })
  assignee: UserEntity;

  @ManyToOne(() => SprintEntity, { eager: true, onDelete: 'CASCADE', nullable: false })
  sprint: SprintEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.task)
  comments: CommentEntity[];

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
