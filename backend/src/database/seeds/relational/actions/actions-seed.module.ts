import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '../../../../actions/infrastructure/persistence/relational/entities/action.entity';
import { RiskEntity } from '../../../../risks/infrastructure/persistence/relational/entities/risk.entity';
import { ActionsSeedService } from './actions-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActionEntity, RiskEntity])],
    providers: [ActionsSeedService],
    exports: [ActionsSeedService],
})
export class ActionsSeedModule { }
