import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';

@Injectable()
export class RisksSeedService {
    constructor(
        @InjectRepository(RiskEntity)
        private repository: Repository<RiskEntity>,
    ) { }

    async run() {
        const count = await this.repository.count();

        if (count === 0) {
            await this.repository.save([
                this.repository.create({
                    title: 'Response Time',
                    description: 'Average response time for API requests in ms',
                    criticity: 1,
                }),
                this.repository.create({
                    title: 'Customer Satisfaction',
                    description: 'CSAT Score from 1 to 10',
                    criticity: 2,
                }),
                this.repository.create({
                    title: 'Bug Fix Rate',
                    description: 'Number of bugs fixed per week',
                    criticity: 3,
                }),
            ]);
        }
    }
}
