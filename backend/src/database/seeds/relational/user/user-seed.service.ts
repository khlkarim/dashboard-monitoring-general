import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) { }

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.ADMINISTRATOR,
        },
      },
    });

    if (!countAdmin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password,
          role: {
            id: RoleEnum.ADMINISTRATOR,
            name: 'Administrator',
          },
          status: {
            id: StatusEnum.ACTIVE,
            name: 'Active',
          },
        }),
      );
    }

    const countPresident = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.PRESIDENT,
        },
      },
    });

    if (!countPresident) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'John',
          lastName: 'President',
          email: 'president@example.com',
          password,
          role: {
            id: RoleEnum.PRESIDENT,
            name: 'President',
          },
          status: {
            id: StatusEnum.ACTIVE,
            name: 'Active',
          },
        }),
      );
    }

    const countMember = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.MEMBER,
        },
      },
    });

    if (!countMember) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Jane',
          lastName: 'Member',
          email: 'member@example.com',
          password,
          role: {
            id: RoleEnum.MEMBER,
            name: 'Member',
          },
          status: {
            id: StatusEnum.ACTIVE,
            name: 'Active',
          },
        }),
      );
    }

    const countAlumni = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.ALUMNI,
        },
      },
    });

    if (!countAlumni) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Alice',
          lastName: 'Alumni',
          email: 'alumni@example.com',
          password,
          role: {
            id: RoleEnum.ALUMNI,
            name: 'Alumni',
          },
          status: {
            id: StatusEnum.ACTIVE,
            name: 'Active',
          },
        }),
      );
    }
  }
}

