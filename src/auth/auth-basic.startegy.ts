import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  public validate = async (user: string, pass: string): Promise<boolean> => {
    if (
      process.env.HTTP_BASIC_USER === user &&
      process.env.HTTP_BASIC_PASS === pass
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
