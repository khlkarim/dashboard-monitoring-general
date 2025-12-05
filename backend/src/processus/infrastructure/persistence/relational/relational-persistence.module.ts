import { Module } from '@nestjs/common';
import { ProcessusRepository } from '../processus.repository';
import { ProcessusRelationalRepository } from './repositories/processus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessusEntity } from './entities/processus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessusEntity])],
  providers: [
    {
      provide: ProcessusRepository,
      useClass: ProcessusRelationalRepository,
    },
  ],
  exports: [ProcessusRepository],
})
export class RelationalProcessusPersistenceModule {}
