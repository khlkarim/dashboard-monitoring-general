import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ProcessusEntity } from 'src/processus/infrastructure/persistence/relational/entities/processus.entity';

@Entity({
  name: 'activity',
})
export class ActivityEntity extends EntityRelationalHelper {
  @ManyToMany(
    () => ProcessusEntity,
    (processus) => processus.activities,
    { eager: true, onDelete: 'CASCADE' }
  )
  @JoinTable()
  processus: ProcessusEntity[];

  @Column({
    nullable: true,
    type:
      Date,
  })
  endDate?: Date | null;

  @Column({
    nullable: true,
    type:
      Date,
  })
  startDate?: Date | null;

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
