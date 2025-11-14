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
  name: 'sprint',
})
export class SprintEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  status: number;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  createdBy: UserEntity;

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
