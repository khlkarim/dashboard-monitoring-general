import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessusEntity } from '../../../../processus/infrastructure/persistence/relational/entities/processus.entity';
import { ProcessusSeedService } from './processus-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProcessusEntity])],
    providers: [ProcessusSeedService],
    exports: [ProcessusSeedService],
})
export class ProcessusSeedModule { }
