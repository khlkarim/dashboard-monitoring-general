import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity } from '../../../../actions/infrastructure/persistence/relational/entities/action.entity';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';

@Injectable()
export class ActionsSeedService {
    constructor(
        @InjectRepository(ActionEntity)
        private repository: Repository<ActionEntity>,
        @InjectRepository(RiskEntity)
        private riskRepository: Repository<RiskEntity>,
    ) { }

    async run() {
        // Create actions for all risks (check if actions already exist)
        const risks = await this.riskRepository.find();

        for (const risk of risks) {
            const actions = await this.repository.find({ where: { risk: { id: risk.id } } });
            if (actions.length > 0) {
                continue;
            }
            await this.repository.save([
                this.repository.create({
                    title: 'Action 1',
                    description: 'Description 1',
                    risk,
                }),
                this.repository.create({
                    title: 'Action 2',
                    description: 'Description 2',
                    risk,
                }),
            ]);
        }
    }
}
