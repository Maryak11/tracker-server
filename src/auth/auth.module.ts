import { Module } from '@nestjs/common';
import { BasicStrategy } from './auth-basic.startegy';

@Module({
  providers: [BasicStrategy],
  imports: [],
})
export class AuthModule {}
