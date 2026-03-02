import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../../../tasks/infrastructure/persistence/relational/entities/task.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { TaskStatusEnum } from 'src/tasks/domain/task-status.enum';

@Injectable()
export class TaskStatisticsSeedService {
    constructor(
        @InjectRepository(TaskEntity)
        private repository: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SprintEntity)
        private sprintRepository: Repository<SprintEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
    ) { }

    async run() {
        console.log('Starting task statistics seed...');

        // Get users and sprint
        const [members, sprint] = await Promise.all([
            this.userRepository.find({ where: { role: { id: RoleEnum.MEMBER } }, relations: ['skills'] }),
            this.sprintRepository.findOne({ where: {}, order: { createdAt: 'DESC' } }),
        ]);

        if (members.length === 0) {
            console.log('No members found. Skipping task statistics seeding.');
            return;
        }

        if (!sprint) {
            console.log('No sprints found. Skipping task statistics seeding.');
            return;
        }

        // Get or create skills
        const skills = await this.ensureSkills();

        // Assign skills to members if they don't have any
        await this.assignSkillsToMembers(members, skills);

        // Create diverse tasks for each member
        for (const member of members) {
            await this.createTasksForMember(member, sprint, members[0]);
        }

        console.log('Task statistics seed completed!');
    }

    private async ensureSkills(): Promise<SkillEntity[]> {
        const skillNames = ['Frontend', 'Backend', 'Database', 'DevOps', 'Testing', 'Design'];
        const skills: SkillEntity[] = [];

        for (const name of skillNames) {
            let skill = await this.skillRepository.findOne({ where: { title: name } });
            
            if (!skill) {
                skill = await this.skillRepository.save(
                    this.skillRepository.create({
                        title: name,
                        description: `${name} development skills`,
                    })
                );
            }
            
            skills.push(skill);
        }

        return skills;
    }

    private async assignSkillsToMembers(members: UserEntity[], skills: SkillEntity[]): Promise<void> {
        for (const member of members) {
            if (!member.skills || member.skills.length === 0) {
                // Assign 2-3 random skills to each member
                const numSkills = 2 + Math.floor(Math.random() * 2);
                const shuffledSkills = skills.sort(() => 0.5 - Math.random());
                member.skills = shuffledSkills.slice(0, numSkills);
                await this.userRepository.save(member);
            }
        }
    }

    private async createTasksForMember(
        member: UserEntity,
        sprint: SprintEntity,
        reporter: UserEntity,
    ): Promise<void> {
        const now = new Date();
        
        // Random number of tasks between 7 and 15
        const numTasks = 7 + Math.floor(Math.random() * 9);
        
        // Possible task templates
        const taskTemplates = [
            { title: 'User Authentication', description: 'Implement secure user authentication', deliverable: 'Auth system' },
            { title: 'Database Schema', description: 'Design and implement database structure', deliverable: 'Schema design' },
            { title: 'API Development', description: 'Create RESTful API endpoints', deliverable: 'API endpoints' },
            { title: 'Frontend Components', description: 'Build reusable UI components', deliverable: 'UI components' },
            { title: 'Unit Testing', description: 'Write comprehensive test coverage', deliverable: 'Test suite' },
            { title: 'Code Review', description: 'Review team pull requests', deliverable: 'Review feedback' },
            { title: 'Documentation', description: 'Update technical documentation', deliverable: 'Updated docs' },
            { title: 'Bug Fixing', description: 'Resolve reported issues', deliverable: 'Bug fixes' },
            { title: 'Performance Optimization', description: 'Improve application performance', deliverable: 'Performance improvements' },
            { title: 'Security Audit', description: 'Conduct security review', deliverable: 'Security report' },
            { title: 'Integration Testing', description: 'Test system integrations', deliverable: 'Integration tests' },
            { title: 'CI/CD Setup', description: 'Configure deployment pipeline', deliverable: 'Pipeline config' },
            { title: 'Mobile Responsiveness', description: 'Ensure mobile compatibility', deliverable: 'Responsive design' },
            { title: 'Data Migration', description: 'Migrate legacy data', deliverable: 'Migration scripts' },
            { title: 'Error Handling', description: 'Implement error handling', deliverable: 'Error handlers' },
        ];
        
        // Shuffle and select random tasks
        const shuffledTemplates = taskTemplates.sort(() => 0.5 - Math.random()).slice(0, numTasks);
        
        const tasks = shuffledTemplates.map((template, index) => {
            // Random dates
            const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
            const startDaysAgo = daysAgo + Math.floor(Math.random() * 7); // Start a bit earlier
            const daysAhead = Math.floor(Math.random() * 14) + 1; // 1-14 days ahead
            
            const startDate = new Date(now.getTime() - startDaysAgo * 24 * 60 * 60 * 1000);
            const dueDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
            
            // Random status distribution
            const rand = Math.random();
            let status: TaskStatusEnum;
            let actualStartDate: Date | null;
            
            if (rand < 0.35) { // 35% DONE
                status = TaskStatusEnum.DONE;
                actualStartDate = startDate;
            } else if (rand < 0.70) { // 35% IN_PROGRESS
                status = TaskStatusEnum.IN_PROGRESS;
                actualStartDate = startDate;
            } else { // 30% TODO
                status = TaskStatusEnum.TODO;
                actualStartDate = null;
            }
            
            // Some tasks might be overdue (10% chance for in-progress tasks)
            let actualDueDate = dueDate;
            if (status === TaskStatusEnum.IN_PROGRESS && Math.random() < 0.15) {
                actualDueDate = new Date(now.getTime() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
            }
            
            // Random criticality (1-5)
            const criticality = Math.floor(Math.random() * 5) + 1;
            
            return {
                title: `${template.title} - ${member.firstName}`,
                description: template.description,
                status,
                criticality,
                startDate: actualStartDate,
                dueDate: actualDueDate,
                deliverable: template.deliverable,
                sprint,
                reporter,
                assignee: member,
            };
        });

        for (const taskData of tasks) {
            const existingTask = await this.repository.findOne({
                where: { 
                    title: taskData.title,
                    assignee: { id: member.id },
                },
            });

            if (!existingTask) {
                await this.repository.save(this.repository.create(taskData));
            }
        }

        console.log(`Created ${tasks.length} diverse tasks for ${member.firstName} ${member.lastName}`);
    }
}
