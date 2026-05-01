import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity } from '../../../../actions/infrastructure/persistence/relational/entities/action.entity';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';
import { ActionType } from 'src/actions/domain/action-type.enum';
import { risks } from '../data/risks';

@Injectable()
export class ActionsSeedService {
    constructor(
        @InjectRepository(ActionEntity)
        private repository: Repository<ActionEntity>,
        @InjectRepository(RiskEntity)
        private riskRepository: Repository<RiskEntity>,
    ) { }

    async run() {
        const count = await this.repository.count();
        if (count > 0) return;

        const actionsToCreate: ActionEntity[] = [];

        for (const [processusLabel, processusData] of Object.entries(risks)) {
            for (const riskData of processusData.risks) {
                const risk = await this.riskRepository.findOne({ where: { title: riskData.title } });

                for (const action of riskData.actions) {
                    let actionType = ActionType.CORRECTIVE;
                    if (action.type === 'PREVENTIVE') {
                        actionType = ActionType.PREVENTIVE;
                    }
                    if (action.type === 'MESUREMENT_METHOD') {
                        actionType = ActionType.MESUREMENT_METHOD;
                    }

                    actionsToCreate.push(
                        this.repository.create({
                            title: action.title,
                            description: action.description,
                            type: actionType,
                            risk: { id: risk?.id }
                        }),
                    );
                }

            }
        }

        if (actionsToCreate.length) {
            await this.repository.save(actionsToCreate);
        }
    }
}
