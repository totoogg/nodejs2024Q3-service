import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IFavoritesResponse } from './entities/favorit.entities';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  async getFavorites() {
    const favorites = await this.db.getFavorites();
    const res: IFavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };

    for (const key in favorites) {
      if (Object.prototype.hasOwnProperty.call(favorites, key)) {
        const answer: Promise<[]> = Promise.all(
          favorites[key].map(async (el: string) => {
            if (key === 'artists') {
              return await this.db.getArtistById(el);
            } else if (key === 'albums') {
              return await this.db.getAlbumById(el);
            } else if (key === 'tracks') {
              return await this.db.getTrackById(el);
            }
          }),
        );
        res[key] = (await answer).filter((el) => el);
      }
    }

    return res;
  }

  async addTrack(id: string) {
    const track = await this.db.getTrackById(id);

    if (track) {
      await this.db.addTrack(id);
    }

    return track;
  }

  async deleteTrack(id: string) {
    const track = await this.db.checkTrack(id);

    if (track) {
      const res = await this.db.deleteFavoriteTrack(id);

      return res;
    }

    return track;
  }

  async addAlbum(id: string) {
    const album = await this.db.getAlbumById(id);

    if (album) {
      await this.db.addAlbum(id);
    }

    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.db.checkAlbum(id);

    if (album) {
      const res = await this.db.deleteFavoriteAlbum(id);

      return res;
    }

    return album;
  }

  async addArtist(id: string) {
    const artist = await this.db.getArtistById(id);

    if (artist) {
      await this.db.addArtist(id);
    }

    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await this.db.checkArtist(id);

    if (artist) {
      const res = await this.db.deleteFavoriteArtist(id);

      return res;
    }

    return artist;
  }
}
