import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'kpi',
})
export class KpiEntity extends EntityRelationalHelper {
  @ManyToOne(() => SprintEntity, { eager: true, nullable: true })
  sprint?: SprintEntity | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  createdBy: UserEntity;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  targetValue?: number | null;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  actualValue?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

