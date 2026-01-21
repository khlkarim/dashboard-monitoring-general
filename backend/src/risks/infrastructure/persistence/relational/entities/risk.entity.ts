import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,



















} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ActionEntity } from 'src/actions/infrastructure/persistence/relational/entities/action.entity';

@Entity({
  name: 'risk',
})
export class RiskEntity extends EntityRelationalHelper {
  @OneToMany(() => ActionEntity, (action) => action.risk, { eager: true })
  actions: ActionEntity[];

  @Column({
    nullable: true,
    type:
      String,
  })


  description?: string | null;



  @Column({
    nullable: true,
    type:
      Number,
  })


  criticity?: number | null;



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
