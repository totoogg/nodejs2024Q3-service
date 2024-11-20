import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { IFavoritesResponse } from './entities/favorite.entities';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getFavorites(): Promise<IFavoritesResponse> {
    return await this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = await this.favoritesService.addTrack(id);

    if (!track) {
      throw new HttpException(
        { message: [`Track with id ${id} does not exist`] },
        422,
      );
    }

    return track;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = await this.favoritesService.deleteTrack(id);

    if (!track) {
      throw new HttpException(
        { message: [`Track with id ${id} does not favorite`] },
        404,
      );
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = await this.favoritesService.addAlbum(id);

    if (!album) {
      throw new HttpException(
        { message: [`Album with id ${id} does not exist`] },
        422,
      );
    }

    return album;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = await this.favoritesService.deleteAlbum(id);

    if (!album) {
      throw new HttpException(
        { message: [`Album with id ${id} does not favorite`] },
        404,
      );
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const artist = await this.favoritesService.addArtist(id);

    if (!artist) {
      throw new HttpException(
        { message: [`Artist with id ${id} does not exist`] },
        422,
      );
    }

    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const artist = await this.favoritesService.deleteArtist(id);

    if (!artist) {
      throw new HttpException(
        { message: [`Artist with id ${id} does not favorite`] },
        404,
      );
    }
  }
}
