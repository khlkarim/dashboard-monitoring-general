import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { RoleEnum } from '../../../../roles/roles.enum';

@Injectable()
export class TaskSeedService {
    constructor(
        @InjectRepository(TaskEntity)
        private repository: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SprintEntity)
        private sprintRepository: Repository<SprintEntity>,
    ) { }

    async run() {
        // Determine admin, president, member to assign tasks
        const [admin, president, member] = await Promise.all([
            this.userRepository.findOne({ where: { role: { id: RoleEnum.administrator } } }),
            this.userRepository.findOne({ where: { role: { id: RoleEnum.president } } }),
            this.userRepository.findOne({ where: { role: { id: RoleEnum.member } } }),
        ]);

        if (!admin || !president || !member) {
            console.log('Required users not found. Skipping task seeding.');
            return;
        }

        const sprint = await this.sprintRepository.findOne({ where: {} }); // Just grab the first one
        if (!sprint) {
            console.log('No sprints found. Skipping task seeding.');
            return;
        }

        const count = await this.repository.count();

        if (count === 0) {
            await this.repository.save([
                this.repository.create({
                    title: 'Setup Project Structure',
                    description: 'Initialize the NestJS backend and React frontend.',
                    dueDate: new Date(),
                    status: 0,
                    type: 1,
                    sprint: sprint,
                    reporter: president,
                    assignee: member,
                }),
                this.repository.create({
                    title: 'Database Schema Design',
                    description: 'Design the initial ERD for the project.',
                    dueDate: new Date(),
                    status: 1,
                    type: 2,
                    sprint: sprint,
                    reporter: president,
                    assignee: admin,
                }),
                this.repository.create({
                    title: 'Frontend Component Library',
                    description: 'Create reusable UI components.',
                    dueDate: new Date(),
                    status: 0,
                    type: 1,
                    sprint: sprint,
                    reporter: admin,
                    assignee: member,
                }),
            ]);
        }
    }
}
