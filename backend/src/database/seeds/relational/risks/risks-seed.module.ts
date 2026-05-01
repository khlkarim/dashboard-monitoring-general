import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';
import { RisksSeedService } from './risks-seed.service';
import { ProcessusEntity } from 'src/processus/infrastructure/persistence/relational/entities/processus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RiskEntity, ProcessusEntity])],
    providers: [RisksSeedService],
    exports: [RisksSeedService],
})
export class RisksSeedModule { }
