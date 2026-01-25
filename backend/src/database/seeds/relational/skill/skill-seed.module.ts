import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';
import { SkillSeedService } from './skill-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillSeedService],
  exports: [SkillSeedService],
})
export class SkillSeedModule {}
