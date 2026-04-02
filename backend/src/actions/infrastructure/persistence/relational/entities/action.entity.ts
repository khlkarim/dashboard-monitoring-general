import { RiskEntity } from '../../../../../risks/infrastructure/persistence/relational/entities/risk.entity';

import {
  Entity,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ActionType } from 'src/actions/domain/action-type.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

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
    { eager: true, onDelete: 'CASCADE', nullable: false }
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
