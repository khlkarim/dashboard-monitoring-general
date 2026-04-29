import { ProcessusEntity } from '../../../../../processus/infrastructure/persistence/relational/entities/processus.entity';
import {
  Entity,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SprintEntity } from '../../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'kpi',
})
export class KpiEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
      String,
  })
  samplingMethod?: string | null;

  @Column({
    nullable: true,
    type: 'simple-array',
  })
  samples?: number[] | null;

  @Column({
    nullable: true,
    type: 'simple-array',
  })
  targetSamples?: number[] | null;

  @Column({
    nullable: true,
    type: 'simple-array',
  })
  sampleDates?: Date[] | null;

  @Column({
    nullable: true,
    type:
      String,
  })
  samplingRate?: string | null;

  @ManyToOne(
    () => ProcessusEntity,
    { eager: true, onDelete: 'CASCADE', nullable: true }
  )
  processus?: ProcessusEntity | null;

  @ManyToOne(() => SprintEntity, { eager: true, onDelete: 'CASCADE', nullable: true })
  sprint?: SprintEntity | null;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE', nullable: false })
  manager: UserEntity;

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

