import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class PoolGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest().headers;
    console.log(req);

    if (!req.pool) {
      return false;
    }
    return true;
  }
}
