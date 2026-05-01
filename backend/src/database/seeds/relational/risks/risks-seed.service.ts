import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';
import { risks } from '../data/risks';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

@Injectable()
export class RisksSeedService {
    constructor(
        @InjectRepository(RiskEntity)
        private repository: Repository<RiskEntity>,

        @InjectRepository(ProcessusEntity)
        private readonly processusRepository: Repository<ProcessusEntity>
    ) { }

    async run() {
        const count = await this.repository.count();
        if (count > 0) return;

        const risksToCreate: RiskEntity[] = [];

        for (const [processusLabel, processusData] of Object.entries(risks)) {
            const processus = await this.processusRepository.findOne({
                where: {
                    label: processusLabel
                }
            });

            for (const risk of processusData.risks) {
                risksToCreate.push(
                    this.repository.create({
                        title: risk.title,
                        description: risk.description,
                        severity: risk.severity,
                        detection: risk.detection,
                        occurrence: risk.occurence,
                        processus: { id: processus?.id }
                    }),
                );
            }
        }

        if (risksToCreate.length) {
            await this.repository.save(risksToCreate);
        }
    }
}
