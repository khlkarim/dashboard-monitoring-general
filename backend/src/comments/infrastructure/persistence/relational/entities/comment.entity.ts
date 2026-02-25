import { TaskEntity } from '../../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  Entity,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'comment',
})
export class CommentEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => TaskEntity,
    { eager: true, onDelete: 'CASCADE', nullable: true }
  )
  task?: TaskEntity | null;

  @ManyToOne(
    () => UserEntity,
    { eager: true, onDelete: 'CASCADE', nullable: true }
  )
  author?: UserEntity | null;

  @Column({
    nullable: true,
    type:
      String,
  })
  content?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
