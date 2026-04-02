import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { SprintStatus } from 'src/sprints/domain/sprint-status.enum';

@Injectable()
export class SprintSeedService {
    constructor(
        @InjectRepository(SprintEntity)
        private repository: Repository<SprintEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async run() {
        const admin = await this.userRepository.findOne({
            where: { role: { id: RoleEnum.ADMINISTRATOR } },
        });

        if (!admin) {
            console.log('Admin user not found. Skipping sprint seeding.');
            return;
        }

        const count = await this.repository.count();

        if (count === 0) {
            const today = new Date();
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);

            const twoMonthsLater = new Date(today);
            twoMonthsLater.setMonth(today.getMonth() + 2);

            await this.repository.save([
                this.repository.create({
                    name: 'Sprint 1',
                    goal: 'Initial MVP Release',
                    startDate: today,
                    validationDate: nextMonth,
                    endDate: twoMonthsLater,
                    status: SprintStatus.ACTIVE,
                    createdBy: admin,
                }),
                this.repository.create({
                    name: 'Sprint 2',
                    goal: 'Feature Expansion',
                    startDate: nextMonth,
                    validationDate: twoMonthsLater,
                    endDate: twoMonthsLater,
                    status: SprintStatus.PLANNED,
                    createdBy: admin,
                }),
            ]);
        }
    }
}
