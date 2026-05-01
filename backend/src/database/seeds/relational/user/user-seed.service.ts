import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

import { users } from '../data/users';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,

    @InjectRepository(ProcessusEntity)
    private readonly processusRepository: Repository<ProcessusEntity>,
  ) { }

  async run(): Promise<void> {
    let count = await this.userRepository.count();
    if (count > 0) return;

    const allSkills = await this.skillRepository.find();

    const salt = await bcrypt.genSalt();
    const usersToCreate: UserEntity[] = [];

    if (!(await this.exists('admin@example.com'))) {
      const password = await bcrypt.hash('secret', salt);

      usersToCreate.push(
        this.userRepository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password,
          role: { id: RoleEnum.ADMINISTRATOR },
          status: { id: StatusEnum.ACTIVE },
        }),
      );
    }

    if (!(await this.exists('alumni@example.com'))) {
      const password = await bcrypt.hash('secret', salt);

      usersToCreate.push(
        this.userRepository.create({
          firstName: 'Alice',
          lastName: 'Alumni',
          email: 'alumni@example.com',
          password,
          role: { id: RoleEnum.ALUMNI },
          status: { id: StatusEnum.ACTIVE },
          skills: allSkills.map(s => ({ id: s.id })),
        }),
      );
    }

    for (const user of users) {
      const password = await bcrypt.hash(user.password, salt);
      const role = user.role === 'PRESIDENT' ? RoleEnum.PRESIDENT : RoleEnum.MEMBER;
      const processus = await this.processusRepository.findOne({ where: { label: user.processus } });

      usersToCreate.push(
        this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password,
          role: { id: role },
          status: { id: StatusEnum.ACTIVE },
          processus: { id: processus?.id }
        }),
      );
    }

    if (usersToCreate.length) {
      await this.userRepository.save(usersToCreate);
    }
  }

  private async exists(email: string): Promise<boolean> {
    return (
      (await this.userRepository.count({
        where: { email },
      })) > 0
    );
  }
}
