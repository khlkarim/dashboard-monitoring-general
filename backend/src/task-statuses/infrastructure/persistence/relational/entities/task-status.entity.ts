import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,



















} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'task_status',
})
export class TaskStatusEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type:
              Number,
        })


  precedence?: number  | null;



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
