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
        id: RoleEnum.administrator,
      },
    });

    if (!countAdministrator) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.administrator,
          name: 'Administrator',
        }),
      );
    }

    const countPresident = await this.repository.count({
      where: {
        id: RoleEnum.president,
      },
    });

    if (!countPresident) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.president,
          name: 'President',
        }),
      );
    }

    const countMember = await this.repository.count({
      where: {
        id: RoleEnum.member,
      },
    });

    if (!countMember) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.member,
          name: 'Member',
        }),
      );
    }

    const countAlumni = await this.repository.count({
      where: {
        id: RoleEnum.alumni,
      },
    });

    if (!countAlumni) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.alumni,
          name: 'Alumni',
        }),
      );
    }
  }
}
