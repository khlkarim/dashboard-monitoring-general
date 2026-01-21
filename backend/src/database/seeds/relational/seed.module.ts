import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import { ProcessusSeedModule } from './processus/processus-seed.module';
import { SprintSeedModule } from './sprint/sprint-seed.module';
import { TaskSeedModule } from './task/task-seed.module';
import { KpiSeedModule } from './kpi/kpi-seed.module';
import { ActionsSeedModule } from './actions/actions-seed.module';
import { RisksSeedModule } from './risks/risks-seed.module';
import databaseConfig from '../../config/database.config';
import appConfig from '../../../config/app.config';

@Module({
  imports: [
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    ProcessusSeedModule,
    SprintSeedModule,
    TaskSeedModule,
    KpiSeedModule,
    ActionsSeedModule,
    RisksSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule { }

