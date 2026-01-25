import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SkillEntity } from '../../../../skills/infrastructure/persistence/relational/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SkillEntity])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule { }
