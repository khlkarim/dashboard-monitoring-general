import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiEntity } from '../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { RoleEnum } from '../../../../roles/roles.enum';

@Injectable()
export class KpiSeedService {
    constructor(
        @InjectRepository(KpiEntity)
        private repository: Repository<KpiEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SprintEntity)
        private sprintRepository: Repository<SprintEntity>,
    ) { }

    async run() {
        const member = await this.userRepository.findOne({
            where: { role: { id: RoleEnum.member } },
        });

        if (!member) {
            console.log('Member user not found. Skipping KPI seeding.');
            return;
        }

        // Sprint is optional for KPIs, but let's link one for demonstration
        const sprint = await this.sprintRepository.findOne({ where: {} });

        const count = await this.repository.count();

        if (count === 0) {
            await this.repository.save([
                this.repository.create({
                    name: 'Response Time',
                    description: 'Average response time for API requests in ms',
                    targetValue: 200,
                    actualValue: 150,
                    sprint: sprint || null, // Link if available
                    createdBy: member,
                }),
                this.repository.create({
                    name: 'Customer Satisfaction',
                    description: 'CSAT Score from 1 to 10',
                    targetValue: 9.0,
                    actualValue: 8.5,
                    sprint: sprint || null,
                    createdBy: member,
                }),
                this.repository.create({
                    name: 'Bug Fix Rate',
                    description: 'Number of bugs fixed per week',
                    targetValue: 10,
                    actualValue: 12,
                    sprint: sprint || null,
                    createdBy: member,
                }),
            ]);
        }
    }
}
