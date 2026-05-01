import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiEntity } from '../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';
import { kpis } from '../data/kpis';

@Injectable()
export class KpiSeedService {
    constructor(
        @InjectRepository(KpiEntity)
        private repository: Repository<KpiEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
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

        const count = await this.repository.count();
        if (count > 0) return;

        const kpisToCreate: KpiEntity[] = [];

        for (const [processusLabel, processusData] of Object.entries(kpis)) {
            const processus = await this.processusRepository.findOne({
                where: {
                    label: processusLabel
                }
            });

            for (const kpi of processusData.kpis) {
                kpisToCreate.push(
                    this.repository.create({
                        name: kpi.name,
                        description: kpi.description,
                        sampleDates: kpi.sampleDates,
                        targetSamples: kpi.targetSamples?.slice(0, kpi.sampleDates?.length),
                        samples: kpi.samples?.slice(0, kpi.sampleDates?.length),
                        samplingMethod: kpi.samplingMethod,
                        samplingRate: kpi.samplingRate,
                        processus: { id: processus?.id },
                        manager: { id: member.id }
                    }),
                );
            }
        }

        if (kpisToCreate.length) {
            await this.repository.save(kpisToCreate);
        }
    }
}
