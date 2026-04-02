import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,

    @InjectRepository(ProcessusEntity)
    private readonly processusRepository: Repository<ProcessusEntity>,
  ) {}

  async run(): Promise<void> {
    const [allSkills, allProcessus] = await Promise.all([
      this.skillRepository.find(),
      this.processusRepository.find(),
    ]);

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('secret', salt);

    const usersToCreate: UserEntity[] = [];

    /**
     * ADMIN
     */
    if (!(await this.exists('admin@example.com'))) {
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

    /**
     * PRESIDENT
     */
    if (!(await this.exists('president@example.com'))) {
      usersToCreate.push(
        this.userRepository.create({
          firstName: 'John',
          lastName: 'President',
          email: 'president@example.com',
          password,
          role: { id: RoleEnum.PRESIDENT },
          status: { id: StatusEnum.ACTIVE },
        }),
      );
    }

    /**
     * ALUMNI
     */
    if (!(await this.exists('alumni@example.com'))) {
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

    /**
     * ONE MEMBER PER PROCESSUS
     */
    for (const processus of allProcessus) {
      const email = `member.${processus.label
        .toLowerCase()
        .replace(/\s+/g, '-') }@example.com`;

      if (await this.exists(email)) continue;

      usersToCreate.push(
        this.userRepository.create({
          firstName: 'Member',
          lastName: processus.label,
          email,
          password,
          role: { id: RoleEnum.MEMBER },
          status: { id: StatusEnum.ACTIVE },
          processus: { id: processus.id },
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
