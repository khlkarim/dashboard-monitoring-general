import { Module } from '@nestjs/common';
import { RiskRepository } from '../risk.repository';
import { RiskRelationalRepository } from './repositories/risk.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskEntity } from './entities/risk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskEntity])],
  providers: [
    {
      provide: RiskRepository,
      useClass: RiskRelationalRepository,
    },
  ],
  exports: [RiskRepository],
})
export class RelationalRiskPersistenceModule {}
