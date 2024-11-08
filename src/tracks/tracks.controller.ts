import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { ITrack } from './entities/track.entities';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getTracks(): Promise<ITrack[]> {
    return await this.tracksService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = await this.tracksService.getTrackById(id);

    if (!track) {
      throw new HttpException(`Track with id ${id} does not exist`, 404);
    }

    return track;
  }

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async createTrack(@Body() postData: CreateTrackDto) {
    const track = await this.tracksService.createTrack(postData);

    return track;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() postData: UpdateTrackDto,
  ) {
    const track = await this.tracksService.updateTrack(id, postData);

    if (!track) {
      throw new HttpException(`Track with id ${id} does not exist`, 404);
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = await this.tracksService.deleteTrackById(id);

    if (!track) {
      throw new HttpException(`Track with id ${id} does not exist`, 404);
    }
  }
}
