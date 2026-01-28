import { NestFactory } from '@nestjs/core';
import { ActivitySeedService } from './activity/activity-seed.service';
import { SkillSeedService } from './skill/skill-seed.service';
import { CommentsSeedService } from './comments/comments-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { ProcessusSeedService } from './processus/processus-seed.service';
import { SprintSeedService } from './sprint/sprint-seed.service';
import { TaskSeedService } from './task/task-seed.service';
import { KpiSeedService } from './kpi/kpi-seed.service';
import { RisksSeedService } from './risks/risks-seed.service';
import { ActionsSeedService } from './actions/actions-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(ProcessusSeedService).run();
  await app.get(SkillSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(SprintSeedService).run();
  await app.get(TaskSeedService).run();
  await app.get(KpiSeedService).run();
  await app.get(RisksSeedService).run();
  await app.get(ActionsSeedService).run();

  await app.get(CommentsSeedService).run();

  await app.get(ActivitySeedService).run();

  await app.close();
};

void runSeed();

