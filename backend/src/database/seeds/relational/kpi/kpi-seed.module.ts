import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiEntity } from '../../../../kpis/infrastructure/persistence/relational/entities/kpi.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SprintEntity } from '../../../../sprints/infrastructure/persistence/relational/entities/sprint.entity';
import { KpiSeedService } from './kpi-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([KpiEntity, UserEntity, SprintEntity])],
    providers: [KpiSeedService],
    exports: [KpiSeedService],
})
export class KpiSeedModule { }
