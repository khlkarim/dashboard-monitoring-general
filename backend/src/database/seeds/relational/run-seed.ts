import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { ProcessusSeedService } from './processus/processus-seed.service';
import { SprintSeedService } from './sprint/sprint-seed.service';
import { TaskSeedService } from './task/task-seed.service';
import { KpiSeedService } from './kpi/kpi-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(ProcessusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(SprintSeedService).run();
  await app.get(TaskSeedService).run();
  await app.get(KpiSeedService).run();

  await app.close();
};

void runSeed();

