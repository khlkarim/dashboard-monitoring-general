import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from '../../../../roles/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) { }

  async run() {
    const countAdministrator = await this.repository.count({
      where: {
        id: RoleEnum.ADMINISTRATOR,
      },
    });

    if (!countAdministrator) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.ADMINISTRATOR,
          name: 'Administrator',
        }),
      );
    }

    const countPresident = await this.repository.count({
      where: {
        id: RoleEnum.PRESIDENT,
      },
    });

    if (!countPresident) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.PRESIDENT,
          name: 'President',
        }),
      );
    }

    const countMember = await this.repository.count({
      where: {
        id: RoleEnum.MEMBER,
      },
    });

    if (!countMember) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.MEMBER,
          name: 'Member',
        }),
      );
    }

    const countAlumni = await this.repository.count({
      where: {
        id: RoleEnum.ALUMNI,
      },
    });

    if (!countAlumni) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.ALUMNI,
          name: 'Alumni',
        }),
      );
    }
  }
}
