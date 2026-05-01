import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { SprintStatus } from 'src/sprints/domain/sprint-status.enum';
import { sprints } from '../data/sprints';

@Injectable()
export class SprintSeedService {
    constructor(
        @InjectRepository(SprintEntity)
        private repository: Repository<SprintEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async run() {
        const president = await this.userRepository.findOne({
            where: { role: { id: RoleEnum.PRESIDENT } },
        });

        if (!president) {
            console.log('President user not found. Skipping sprint seeding.');
            return;
        }

        const count = await this.repository.count();
        if (count > 0) return;

        const sprintsToCreate: SprintEntity[] = [];

        for (const sprint of sprints) {
            sprintsToCreate.push(
                this.repository.create({
                    name: sprint.name,
                    startDate: sprint.startDate,
                    endDate: sprint.endDate,
                    validationDate: sprint.validationDate,
                    createdBy: { id: president.id },
                    status: SprintStatus.COMPLETED
                }),
            );
        }

        if (sprintsToCreate.length) {
            await this.repository.save(sprintsToCreate);
        }
    }
}
