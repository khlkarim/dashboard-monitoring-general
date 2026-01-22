import { RiskEntity } from '../../../../../risks/infrastructure/persistence/relational/entities/risk.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ActionType } from 'src/actions/domain/action-type.enum';

@Entity({
  name: 'action',
})
export class ActionEntity extends EntityRelationalHelper {
  @Column({
    enum: ActionType,
    nullable: true,
    type: 'enum',
    default: ActionType.CORRECTIVE,
  })
  type?: ActionType | null;

  @ManyToOne(
    () => RiskEntity,
    (parentEntity) => parentEntity.actions,
    { eager: true, nullable: false }
  )
  risk: RiskEntity;

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
}
