import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PoolsService } from './pools.service';

@Controller('pools')
export class PoolsController {
  constructor(private poolsService: PoolsService) {}
  @Get()
  getPools(@Res() res: Response) {
    return this.poolsService.getPools(res);
  }
}
