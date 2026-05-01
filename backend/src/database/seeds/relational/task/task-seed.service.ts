import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { TaskStatusEnum } from 'src/tasks/domain/task-status.enum';
import { ProcessusEntity } from 'src/processus/infrastructure/persistence/relational/entities/processus.entity';
import { sprints } from '../data/sprints';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class TaskSeedService {
    constructor(
        @InjectRepository(TaskEntity)
        private repository: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SprintEntity)
        private sprintRepository: Repository<SprintEntity>,
        @InjectRepository(ProcessusEntity)
        private processusRepository: Repository<ProcessusEntity>,
    ) { }

    async run() {
        const president = await this.userRepository.findOne({ where: { role: { name: RoleEnum.PRESIDENT } } });
        const member = await this.userRepository.findOne({ where: { role: { name: RoleEnum.MEMBER } } });

        const count = await this.repository.count();
        if (count > 0) return;

        const tasksToCreate: TaskEntity[] = [];

        for (const sprintData of sprints) {
            const sprint = await this.sprintRepository.findOne({ where: { name: sprintData.name } });

            for (const task of sprintData.tasks) {
                if (task.tâche === null) continue;

                let assignee: UserEntity | null = null, reporter: UserEntity | null = null;

                if (task.responsable) {
                    assignee = await this.userRepository.findOne({ where: { firstName: task.responsable.slice(0, task.responsable.indexOf(' ')) } });
                }
                if (assignee === null) {
                    assignee = member;
                }

                if (task.superviseur) {
                    reporter = await this.userRepository.findOne({ where: { firstName: task.superviseur.slice(0, task.superviseur.indexOf(' ')) } });
                }
                if (reporter === null) {
                    reporter = president;
                }

                let processus: ProcessusEntity | null = null;
                if (task.processus) {
                    processus = await this.processusRepository.findOne({ where: { label: task.processus } });
                }

                let status = TaskStatusEnum.TODO;
                if (task.statut === 'En attente') {
                    status = TaskStatusEnum.BLOCKED;
                }
                if (task.statut === 'Terminée') {
                    status = TaskStatusEnum.DONE;
                }
                if (task.statut === 'En cours') {
                    status = TaskStatusEnum.IN_PROGRESS;
                }

                if (!(assignee?.id) || !(reporter?.id)) {
                    console.log(task.tâche);
                    process.exit();
                }

                tasksToCreate.push(
                    this.repository.create({
                        title: task.tâche || "Untitled",
                        assignee: { id: assignee?.id ?? member?.id },
                        reporter: { id: reporter?.id ?? president?.id },
                        processus: { id: processus?.id },
                        expectedDelivrable: task.livrables_attendus,
                        estimatedStartDate: task.date_de_début_prévue,
                        estimatedEndDate: task.date_de_fin_prévue,
                        status,
                        startDate: task.date_de_début_réelle,
                        dueDate: task.date_de_fin_réelle ? task.date_de_fin_réelle : "2027-01-01",
                        deliverable: task.preuves_livrables,
                        sprint: { id: sprint?.id }
                    }),
                );
            }
        }

        if (tasksToCreate.length) {
            await this.repository.save(tasksToCreate);
        }
    }
}
