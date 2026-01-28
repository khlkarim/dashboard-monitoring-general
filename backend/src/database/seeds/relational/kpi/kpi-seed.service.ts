import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiEntity } from '../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

@Injectable()
export class KpiSeedService {
    constructor(
        @InjectRepository(KpiEntity)
        private repository: Repository<KpiEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SprintEntity)
        private sprintRepository: Repository<SprintEntity>,
        @InjectRepository(ProcessusEntity)
        private processusRepository: Repository<ProcessusEntity>,
    ) { }

    async run() {
        const member = await this.userRepository.findOne({
            where: { role: { id: RoleEnum.MEMBER } },
        });

        if (!member) {
            console.log('Member user not found. Skipping KPI seeding.');
            return;
        }

        const sprint = await this.sprintRepository.findOne({ where: {} });
        const processus = await this.processusRepository.findOne({ where: {} });

        const count = await this.repository.count();

        if (count === 0) {
            await this.repository.save([
                this.repository.create({
                    name: 'Response Time',
                    description: 'Average response time for API requests in ms',
                    sprint: sprint || null,
                    manager: member,
                    samplingRate: "Every 10 days",
                    samples: [1, 2, 3, 4, 5],

                }),
                this.repository.create({
                    name: 'Customer Satisfaction',
                    description: 'CSAT Score from 1 to 10',
                    processus: processus || null,
                    manager: member,
                    samplingRate: "Every month",
                    samples: [1, 2, 3, 4, 5],
                }),
                this.repository.create({
                    name: 'Bug Fix Rate',
                    description: 'Number of bugs fixed per week',
                    processus: processus || null,
                    manager: member,
                    samplingRate: "Every week",
                    samples: [1, 2, 3, 4, 5],
                }),
            ]);
        }
    }
}
