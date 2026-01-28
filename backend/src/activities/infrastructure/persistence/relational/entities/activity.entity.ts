import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,

























} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'activity',
})
export class ActivityEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
              Date,
        })


  endDate?: Date  | null;



  @Column({
    nullable: true,
    type:
              Date,
        })


  startDate?: Date  | null;



  @Column({
    nullable: true,
    type:
              String,
        })


  description?: string  | null;



  @Column({
    nullable: true,
    type:
              String,
        })


  title?: string  | null;



  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
