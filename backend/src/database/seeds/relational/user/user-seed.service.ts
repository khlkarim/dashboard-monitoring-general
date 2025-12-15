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
          id: RoleEnum.administrator,
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
            id: RoleEnum.administrator,
            name: 'Administrator',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countPresident = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.president,
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
            id: RoleEnum.president,
            name: 'President',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countMember = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.member,
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
            id: RoleEnum.member,
            name: 'Member',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countAlumni = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.alumni,
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
            id: RoleEnum.alumni,
            name: 'Alumni',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}

