import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tracks } from './tracks.model.';
import { Response } from 'express';
import { HeaderDto } from './dto/Header.dto';
import { QueryDto } from './dto/Query.dto';
import { Op } from 'sequelize';
import { HelpersService } from 'src/helpers/helpers.service';
import { Pools } from 'src/pools/pools.model';
import {
  canParseJSON,
  getErrorProperties,
  isObject,
  parseError,
  probablyIsAnError,
} from 'src/helpers/helpers';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Tracks) private tracksRepository: typeof Tracks,
    @InjectModel(Pools) private poolsRepository: typeof Pools,

    private helpersService: HelpersService,
  ) {}

  async getTracks(headers: HeaderDto, query: QueryDto, res: Response) {
    const tracksPerPage = 100;
    let currentPage = query.page;
    const dateFrom = query.dateFrom
      ? new Date(query.dateFrom)
      : new Date(1000, 1, 1);
    const dateTo = query.dateTo ? new Date(query.dateTo) : new Date(3000, 1, 1);

    const validatePool = await this.poolsRepository.findByPk(headers.pool);

    if (!validatePool) {
      throw new HttpException('Нет такого pool', HttpStatus.BAD_REQUEST);
    }

    const whereConstraints = {
      poolId: headers.pool,
      content: {
        [Op.substring]: query.filter ? query.filter.toString() : '',
      },
      createdAt: {
        [Op.between]: [dateFrom, dateTo],
      },
    };

    const tracksCount = await this.tracksRepository.count({
      where: whereConstraints,
    });

    if (
      !this.helpersService.isPageNumberPossible({
        totalCount: tracksCount,
        itemsPerPage: tracksPerPage,
        page: currentPage,
      }) &&
      tracksCount
    ) {
      currentPage = 1;
    }

    const tracks = await this.tracksRepository.findAll({
      where: whereConstraints,
      raw: true,
      order: [['id', 'DESC']],
      ...this.helpersService.pagination({
        itemsPerPage: tracksPerPage,
        page: currentPage,
      }),
    });
    return res.status(200).json({
      status: 'ok',
      tracks,
      tracksPagesCount: Math.ceil(tracksCount / tracksPerPage),
    });
  }

  async getOneTrack(id: string, res: Response) {
    const track = await this.tracksRepository.findOne({
      where: {
        id,
      },
    });

    if (!track) {
      throw new HttpException('track not found', HttpStatus.BAD_REQUEST);
    }

    return res.status(200).json({
      status: 'ok',
      track,
    });
  }

  async addTrack(data, headers: HeaderDto, res: Response) {
    try {
      const { content, level } = this.formatBody(data);
      const body = JSON.stringify(content);
      await this.tracksRepository.create({
        poolId: headers.pool,
        content: body,
        level,
      });
      return res.status(200).json({ status: 'ok' });
    } catch (err) {
      console.log(err);
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  formatBody(data) {
    const body = data.payload || data;
    try {
      if (probablyIsAnError(body)) {
        return { level: 'error', content: getErrorProperties(body) };
      }
      if (isObject(body)) {
        return { level: 'info', content: body };
      }
      if (canParseJSON(body)) {
        return { level: 'info', content: JSON.parse(body) };
      }
      return { level: 'info', content: JSON.stringify(body) };
    } catch (err) {
      return {
        level: 'log',
        content: { payload: null, error: parseError(err) },
      };
    }
  }
}
