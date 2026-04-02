import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

const PROCESSUS_LIST = [
    { label: 'Management Général', description: 'Direction générale de l\'organisation' },
    { label: 'Qualité et amélioration continue', description: 'Gestion de la qualité et amélioration des processus' },
    { label: 'RH', description: 'Ressources Humaines' },
    { label: 'Formation', description: 'Gestion des formations' },
    { label: 'Projet', description: 'Gestion des projets' },
    { label: 'Développement Commercial', description: 'Développement des activités commerciales' },
    { label: 'Événementiel', description: 'Organisation des événements' },
    { label: 'Marketing', description: 'Stratégie et actions marketing' },
    { label: 'Secrétariat', description: 'Gestion administrative' },
    { label: 'Trésorerie', description: 'Gestion financière' },
    { label: 'Affaires étrangères', description: 'Relations internationales' },
    { label: 'InterJE', description: 'Relations inter Junior Entreprises' },
    { label: 'RSJE', description: 'Réseau des Junior Entreprises' },
    { label: 'Passation', description: 'Transmission des connaissances et responsabilités' },
];

@Injectable()
export class ProcessusSeedService {
    constructor(
        @InjectRepository(ProcessusEntity)
        private repository: Repository<ProcessusEntity>,
    ) { }

    async run() {
        for (const processus of PROCESSUS_LIST) {
            const count = await this.repository.count({
                where: { label: processus.label },
            });

            if (!count) {
                await this.repository.save(
                    this.repository.create(processus),
                );
            }
        }
    }
}
