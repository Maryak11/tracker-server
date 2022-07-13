import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Request } from 'express';
import { PoolGuard } from './track.guard';
import { HeaderDto } from './dto/Header.dto';
import { ValidationPipe } from 'src/pipes/validaton.pipe';
import { CheckPool } from './request-header.decorator';
import { OneDto } from './dto/One.dto';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll(@CheckPool(HeaderDto) headers: HeaderDto) {
    return this.tracksService.getTracks();
  }

  @UsePipes(ValidationPipe)
  @Post()
  one(@Body() one: OneDto) {
    console.log('ghbdtn');
  }
}
