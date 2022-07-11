import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tracks } from './tracks.model.';
import { Request } from 'express';

@Injectable()
export class TracksService {
  constructor(@InjectModel(Tracks) private tracksRepository: typeof Tracks) {}

  async getTracks() {
    const tracks = await this.tracksRepository.findAll();
    return tracks;
  }

  //   async getAllUsers() {
  //     const users = await this.userRepository.findAll({ include: { all: true } });
  //     return users;
  //   }
}
