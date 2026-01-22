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
                    title: 'Deadline exceeded',
                    description: 'The deadline for the project could be exceeded',
                    detection: 1,
                    occurrence: 1,
                    severity: 1,
                }),
                this.repository.create({
                    title: 'Customer unsatisfaction',
                    description: 'The customer is not satisfied with the product',
                    detection: 2,
                    occurrence: 2,
                    severity: 2,
                }),
                this.repository.create({
                    title: 'Buggy Code',
                    description: 'The code has too many bugs',
                    detection: 3,
                    occurrence: 3,
                    severity: 3,
                }),
            ]);
        }
    }
}
