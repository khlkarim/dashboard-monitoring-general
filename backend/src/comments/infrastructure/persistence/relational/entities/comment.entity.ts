import { TaskEntity } from '../../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

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
  name: 'comment',
})
export class CommentEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => TaskEntity,
    { eager: true, nullable: true }
  )
  task?: TaskEntity | null;

  @ManyToOne(
    () => UserEntity,
    { eager: true, nullable: true }
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
