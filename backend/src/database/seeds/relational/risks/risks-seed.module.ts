import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';
import { RisksSeedService } from './risks-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([RiskEntity])],
    providers: [RisksSeedService],
    exports: [RisksSeedService],
})
export class RisksSeedModule { }
