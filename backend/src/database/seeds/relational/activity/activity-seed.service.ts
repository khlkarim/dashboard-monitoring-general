import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityEntity } from '../../../../activities/infrastructure/persistence/relational/entities/activity.entity';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';

type ActivitySeed = {
  title: string;
  description: string;
  startOffsetMonths: number;
  durationMonths: number;
};

const ACTIVITIES_BY_PROCESSUS: Record<string, ActivitySeed[]> = {
  'Management Général': [
    {
      title: 'Définition de la stratégie',
      description: 'Élaboration de la vision et des objectifs stratégiques',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Pilotage des équipes',
      description: 'Supervision et coordination des responsables',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Suivi de la performance',
      description: 'Analyse des indicateurs clés de performance',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  'Qualité et amélioration continue': [
    {
      title: 'Audit interne',
      description: 'Évaluation des processus internes',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Optimisation des procédures',
      description: 'Amélioration continue des méthodes de travail',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Gestion des non-conformités',
      description: 'Identification et correction des écarts',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  RH: [
    {
      title: 'Recrutement',
      description: 'Sélection et intégration des nouveaux membres',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Gestion des performances',
      description: 'Évaluation et suivi des membres',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Climat social',
      description: 'Amélioration du bien-être des équipes',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Formation: [
    {
      title: 'Analyse des besoins',
      description: 'Identification des besoins en formation',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Organisation des formations',
      description: 'Planification et animation des sessions',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Évaluation des acquis',
      description: 'Mesure de l’efficacité des formations',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Projet: [
    {
      title: 'Planification du projet',
      description: 'Définition du périmètre et du planning',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Exécution',
      description: 'Réalisation des tâches du projet',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Clôture',
      description: 'Bilan et livraison finale',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  'Développement Commercial': [
    {
      title: 'Prospection',
      description: 'Recherche de nouveaux clients',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Négociation',
      description: 'Discussion des offres commerciales',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Suivi client',
      description: 'Maintien de la relation client',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Événementiel: [
    {
      title: 'Planification des événements',
      description: 'Définition du concept et de la logistique',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Coordination',
      description: 'Gestion des intervenants et partenaires',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Évaluation post-événement',
      description: 'Analyse des retombées et feedbacks',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Marketing: [
    {
      title: 'Étude de marché',
      description: 'Analyse du public cible',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Création de contenu',
      description: 'Production de supports marketing',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Campagnes de communication',
      description: 'Diffusion des actions marketing',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Secrétariat: [
    {
      title: 'Gestion administrative',
      description: 'Traitement des documents administratifs',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Organisation des réunions',
      description: 'Planification et comptes rendus',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Archivage',
      description: 'Classement et conservation des documents',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Trésorerie: [
    {
      title: 'Suivi des dépenses',
      description: 'Contrôle des sorties financières',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Gestion des budgets',
      description: 'Planification budgétaire',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Reporting financier',
      description: 'Production des rapports financiers',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  'Affaires étrangères': [
    {
      title: 'Relations internationales',
      description: 'Développement des partenariats externes',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Représentation',
      description: 'Participation aux événements internationaux',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Veille stratégique',
      description: 'Suivi des opportunités internationales',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  InterJE: [
    {
      title: 'Coordination inter-JE',
      description: 'Collaboration avec les autres Junior Entreprises',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Échanges de bonnes pratiques',
      description: 'Partage d’expériences',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Projets communs',
      description: 'Mise en place d’initiatives conjointes',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  RSJE: [
    {
      title: 'Animation du réseau',
      description: 'Dynamisation du réseau JE',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Support aux membres',
      description: 'Accompagnement des Junior Entreprises',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Développement du réseau',
      description: 'Expansion et structuration du réseau',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],

  Passation: [
    {
      title: 'Documentation',
      description: 'Rédaction des documents de passation',
      startOffsetMonths: 0,
      durationMonths: 1,
    },
    {
      title: 'Formation des successeurs',
      description: 'Transmission des connaissances',
      startOffsetMonths: 1,
      durationMonths: 1,
    },
    {
      title: 'Suivi post-passation',
      description: 'Accompagnement après transition',
      startOffsetMonths: 2,
      durationMonths: 1,
    },
  ],
};

@Injectable()
export class ActivitySeedService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,

    @InjectRepository(ProcessusEntity)
    private readonly processusRepository: Repository<ProcessusEntity>,
  ) { }

  async run(): Promise<void> {
    const count = await this.activityRepository.count();
    if (count > 0) return;

    // Fetch all processus and create a Map for quick lookup by label
    const processusList = await this.processusRepository.find();
    const processusMap = new Map(processusList.map((p) => [p.label, p]));

    const baseDate = new Date('2026-01-01');
    const activitiesToSave: ActivityEntity[] = [];

    // Iterate through the seed Record
    for (const [label, seeds] of Object.entries(ACTIVITIES_BY_PROCESSUS)) {
      const correspondingProcessus = processusMap.get(label);

      if (!correspondingProcessus) {
        console.warn(`Processus with label "${label}" not found in database. Skipping seeds.`);
        continue;
      }

      for (const seed of seeds) {
        const startDate = new Date(baseDate);
        startDate.setMonth(startDate.getMonth() + seed.startOffsetMonths);

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + seed.durationMonths);

        activitiesToSave.push(
          this.activityRepository.create({
            title: seed.title,
            description: seed.description,
            startDate,
            endDate,
            // ManyToMany expects an array
            processus: [correspondingProcessus],
          }),
        );
      }
    }

    await this.activityRepository.save(activitiesToSave);
  }
}
