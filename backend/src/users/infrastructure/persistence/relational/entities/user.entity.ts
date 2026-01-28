  import { ProcessusEntity } from '../../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,



} from 'typeorm';
import { TaskEntity } from '../../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { NotificationEntity } from '../../../../../notifications/infrastructure/persistence/relational/entities/notification.entity';
import { SkillEntity } from '../../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { JoinTable } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {


      @ManyToOne(
      () => ProcessusEntity,
            { eager: true, nullable: true }
    )
  
  
  
  processus?: ProcessusEntity  | null;



  @Column({
    nullable: true,
    type:
              String,
        })


  workplace?: string  | null;



  @Column({
    nullable: true,
    type:
              String,
        })


  mandate?: string  | null;



  @PrimaryGeneratedColumn('uuid')
  id: string;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @OneToMany(() => TaskEntity, (task) => task.assignee)
  assignedTasks: TaskEntity[];

  @ManyToMany(() => NotificationEntity, (notification) => notification.recipients)
  notifications: NotificationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => SkillEntity, (skill) => skill.users, { eager: true })
  @JoinTable({ name: 'user_skill' })
  skills: SkillEntity[];
}
