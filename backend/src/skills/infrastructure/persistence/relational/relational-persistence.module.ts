import { Module } from '@nestjs/common';
import { SkillRepository } from '../skill.repository';
import { SkillRelationalRepository } from './repositories/skill.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [
    {
      provide: SkillRepository,
      useClass: SkillRelationalRepository,
    },
  ],
  exports: [SkillRepository],
})
export class RelationalSkillPersistenceModule {}
