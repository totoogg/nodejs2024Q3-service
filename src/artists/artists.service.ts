import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './entities/artist.entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private db: DbService) {}

  async getArtists() {
    const artists = await this.db.getArtists();

    return artists;
  }

  async getArtistById(id: string) {
    const artist = await this.db.getArtistById(id);

    return artist;
  }

  async createArtist(data: CreateArtistDto) {
    const { name, grammy } = data;
    const artistData: IArtist = {
      id: uuidv4(),
      name,
      grammy,
    };
    const artist = await this.db.createArtist(artistData);

    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDto) {
    const checkArtist = await this.db.getArtistById(id);

    if (checkArtist) {
      const { name, grammy } = data;
      const artistData = {
        name,
        grammy,
      };

      const artist = await this.db.updateArtist(id, artistData);

      return artist;
    }

    return checkArtist;
  }

  async deleteArtistById(id: string) {
    const artist = await this.db.getArtistById(id);

    if (artist) {
      const res = await this.db.deleteArtist(id);

      await this.db.deleteFavoriteArtist(id);

      await this.db.deleteArtistFromTrack(id);

      await this.db.deleteArtistFromAlbum(id);

      return res;
    }

    return artist;
  }
}
