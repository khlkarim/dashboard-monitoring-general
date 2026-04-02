import {
  Entity,
  Column,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'skill',
})
export class SkillEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
      String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type:
      String,
  })
  title?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user) => user.skills, { cascade: true, onDelete: 'CASCADE' })
  users: UserEntity[];
}
