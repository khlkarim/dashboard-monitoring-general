import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ConfigModule } from '@nestjs/config';
import { RelationalUserPersistenceModule } from '../users/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalSprintPersistenceModule } from '../sprints/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalTaskPersistenceModule } from '../tasks/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalKpiPersistenceModule } from '../kpis/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalRiskPersistenceModule } from '../risks/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalProcessusPersistenceModule } from '../processus/infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ConfigModule,
    RelationalUserPersistenceModule,
    RelationalSprintPersistenceModule,
    RelationalTaskPersistenceModule,
    RelationalKpiPersistenceModule,
    RelationalRiskPersistenceModule,
    RelationalProcessusPersistenceModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
