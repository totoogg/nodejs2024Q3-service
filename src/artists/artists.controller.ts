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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './entities/artist.entities';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getArtists(): Promise<IArtist[]> {
    return await this.artistsService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const artist = await this.artistsService.getArtistById(id);

    if (!artist) {
      throw new HttpException(`Artist with id ${id} does not exist`, 404);
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async createArtist(@Body() postData: CreateArtistDto) {
    const artist = await this.artistsService.createArtist(postData);

    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() postData: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.updateArtist(id, postData);

    if (!artist) {
      throw new HttpException(`Artist with id ${id} does not exist`, 404);
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const artist = await this.artistsService.deleteArtistById(id);

    if (!artist) {
      throw new HttpException(`Artist with id ${id} does not exist`, 404);
    }
  }
}
