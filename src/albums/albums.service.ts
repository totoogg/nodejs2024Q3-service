import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './entities/album.entities';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: DbService) {}

  async getAlbums() {
    const albums = await this.db.getAlbums();

    return albums;
  }

  async getAlbumById(id: string) {
    const album = await this.db.getAlbumById(id);

    return album;
  }

  async createAlbum(data: CreateAlbumDto) {
    const { name, year, artistId } = data;
    const albumData: IAlbum = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    const album = await this.db.createAlbum(albumData);

    return album;
  }

  async updateAlbum(id: string, data: UpdateAlbumDto) {
    const checkAlbum = await this.db.getAlbumById(id);

    if (checkAlbum) {
      const { name, year, artistId } = data;
      const albumData = {
        name,
        year,
        artistId: artistId || null,
      };

      const album = await this.db.updateAlbum(id, albumData);

      return album;
    }

    return checkAlbum;
  }

  async deleteAlbumById(id: string) {
    const album = await this.db.getAlbumById(id);

    if (album) {
      const res = await this.db.deleteAlbum(id);

      await this.db.deleteFavoriteAlbum(id);

      await this.db.deleteAlbumFromTrack(id);

      return res;
    }

    return album;
  }
}
