import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TaskEntity } from '../../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { KpiEntity } from '../../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SprintStatus } from 'src/sprints/domain/sprint-status.enum';

@Entity({
  name: 'sprint',
})
export class SprintEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
      Date,
  })
  validationDate?: Date | null;

  @Column({
    nullable: false,
    type: 'enum',
    enum: SprintStatus,
    default: SprintStatus.PLANNED,
  })
  status: SprintStatus;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  createdBy: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.sprint)
  tasks: TaskEntity[];

  @OneToMany(() => KpiEntity, (kpi) => kpi.sprint)
  kpis: KpiEntity[];

  @Column({
    nullable: false,
    type: Date,
  })
  endDate: Date;

  @Column({
    nullable: false,
    type: Date,
  })
  startDate: Date;

  @Column({
    nullable: true,
    type: String,
  })
  goal?: string | null;

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
