import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tracks } from './tracks/tracks.model.';
import { Pools } from './pools/pools.model';
import { AuthModule } from './auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { PoolsModule } from './pools/pools.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Tracks, Pools],
      autoLoadModels: true,
    }),

    AuthModule,
    TracksModule,
    PoolsModule,
  ],
})
export class AppModule {}
