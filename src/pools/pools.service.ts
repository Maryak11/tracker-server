import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Pools } from './pools.model';

@Injectable()
export class PoolsService {
  constructor(@InjectModel(Pools) private poolsRepository: typeof Pools) {}

  async getPools(res: Response) {
    try {
      const pools = await this.poolsRepository.findAll();

      return res.status(200).json(pools);
    } catch (err) {
      console.log(err);

      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
