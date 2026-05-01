import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';
import { processus as processusList } from '../data/processus';

@Injectable()
export class ProcessusSeedService {
    constructor(
        @InjectRepository(ProcessusEntity)
        private repository: Repository<ProcessusEntity>,
    ) { }

    async run() {
        let count = await this.repository.count();
        if (count > 0) return;

        for (const processus of processusList) {
            await this.repository.save(
                this.repository.create(processus),
            );
        }
    }
}
