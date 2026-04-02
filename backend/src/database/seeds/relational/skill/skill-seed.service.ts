import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillSeedService {
  constructor(
    @InjectRepository(SkillEntity)
    private repository: Repository<SkillEntity>,
  ) { }

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          title: 'Website Development',
          description: 'Full-stack website development and design.',
        }),
        this.repository.create({
          title: 'Mobile Application Development',
          description: 'Native and cross-platform mobile app development.',
        }),
        this.repository.create({
          title: 'Search Engine Optimization (SEO)',
          description: 'Optimizing websites for better visibility on search engines.',
        }),
        this.repository.create({
          title: 'Entrepreneurship Training',
          description: 'Training and mentoring in entrepreneurship skills.',
        }),
        this.repository.create({
          title: 'Project Management',
          description: 'Managing and coordinating projects efficiently.',
        }),
        this.repository.create({
          title: 'UI/UX Design',
          description: 'Creating user-friendly and aesthetically pleasing interfaces.',
        }),
      ]);
    }
  }
}
