import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Request } from 'express';
import { PoolGuard } from './track.guard';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}
  @UseGuards(PoolGuard)
  @Get()
  getAll() {
    return this.tracksService.getTracks();
  }
}
