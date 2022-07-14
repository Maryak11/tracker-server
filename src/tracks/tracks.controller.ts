import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Response } from 'express';

import { HeaderDto } from './dto/Header.dto';
import { ValidationPipe } from 'src/pipes/validaton.pipe';
import { CheckPool } from './request-header.decorator';

import { QueryDto } from './dto/Query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('basic'))
  @Get()
  getAll(
    @CheckPool(HeaderDto) headers: HeaderDto,
    @Query() query: QueryDto,
    @Res() res: Response,
  ) {
    return this.tracksService.getTracks(headers, query, res);
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    return this.tracksService.getOneTrack(id, res);
  }

  @Post()
  addTrack(
    @Body() body: any,
    @Res() res: Response,
    @CheckPool(HeaderDto) headers: HeaderDto,
  ) {
    return this.tracksService.addTrack(body, headers, res);
  }
}
