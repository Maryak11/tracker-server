import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { Pools } from 'src/pools/pools.model';
import { TracksController } from './tracks.controller';
import { Tracks } from './tracks.model.';

import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    SequelizeModule.forFeature([Tracks, Pools]),
    HelpersModule,
    AuthModule,
  ],
})
export class TracksModule {}
