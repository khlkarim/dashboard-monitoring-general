import { Module } from '@nestjs/common';
import { KpiRepository } from '../kpi.repository';
import { KpiRelationalRepository } from './repositories/kpi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiEntity } from './entities/kpi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KpiEntity])],
  providers: [
    {
      provide: KpiRepository,
      useClass: KpiRelationalRepository,
    },
  ],
  exports: [KpiRepository],
})
export class RelationalKpiPersistenceModule {}
