import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { KpiEntity } from '../../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ActivityEntity } from 'src/activities/infrastructure/persistence/relational/entities/activity.entity';

@Entity({
  name: 'processus',
})
export class ProcessusEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
      String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type:
      String,
  })
  label: string;

  @OneToMany(() => KpiEntity, (kpi) => kpi.processus)
  kpis: KpiEntity[];

  @ManyToMany(
    () => ActivityEntity,
    (activity) => activity.processus
  )
  activities: ActivityEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
