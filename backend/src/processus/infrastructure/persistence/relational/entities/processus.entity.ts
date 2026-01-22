import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { KpiEntity } from '../../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
