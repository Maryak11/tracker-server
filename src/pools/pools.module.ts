import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tracks } from 'src/tracks/tracks.model.';

import { PoolsController } from './pools.controller';
import { Pools } from './pools.model';
import { PoolsService } from './pools.service';

@Module({
  controllers: [PoolsController],
  providers: [PoolsService],
  imports: [SequelizeModule.forFeature([Tracks, Pools])],
})
export class PoolsModule {}
