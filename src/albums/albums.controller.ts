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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './entities/album.entities';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getAlbums(): Promise<IAlbum[]> {
    return await this.albumsService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getAlbumById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = await this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        { message: [`Album with id ${id} does not exist`] },
        404,
      );
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async createAlbum(@Body() postData: CreateAlbumDto) {
    const album = await this.albumsService.createAlbum(postData);

    return album;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() postData: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.updateAlbum(id, postData);

    if (!album) {
      throw new HttpException(
        { message: [`Album with id ${id} does not exist`] },
        404,
      );
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbumById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = await this.albumsService.deleteAlbumById(id);

    if (!album) {
      throw new HttpException(
        { message: [`Album with id ${id} does not exist`] },
        404,
      );
    }
  }
}
