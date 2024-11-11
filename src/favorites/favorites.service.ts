import { Injectable } from '@nestjs/common';
import { IFavoritesResponse } from './entities/favorite.entities';
import { PrismaService } from 'src/db/dbPrisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  private async getFavoritesDb() {
    let favorite = await this.prisma.favorites.findUnique({
      where: {
        id: 1,
      },
    });

    if (!favorite) {
      favorite = await this.prisma.favorites.create({
        data: {
          albums: [],
          artists: [],
          tracks: [],
        },
      });
    }

    return favorite;
  }

  async getFavorites() {
    const favorite = await this.getFavoritesDb();

    const res: IFavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };

    const getAllData = Promise.all([
      this.prisma.album.findMany({
        where: {
          id: {
            in: favorite.albums,
          },
        },
      }),
      this.prisma.artist.findMany({
        where: {
          id: {
            in: favorite.artists,
          },
        },
      }),
      this.prisma.track.findMany({
        where: {
          id: {
            in: favorite.tracks,
          },
        },
      }),
    ]);

    [res.albums, res.artists, res.tracks] = await getAllData;

    return res;
  }

  async addTrack(id: string) {
    try {
      const track = await this.prisma.track.findUnique({ where: { id } });

      if (track) {
        const favorite = await this.getFavoritesDb();

        if (!favorite.tracks.includes(id)) {
          await this.prisma.favorites.update({
            where: {
              id: 1,
            },
            data: {
              tracks: {
                push: id,
              },
            },
          });
        }
      }

      return track;
    } catch {
      return undefined;
    }
  }

  async deleteTrack(id: string) {
    try {
      const track = await this.prisma.favorites.findUnique({
        where: {
          id: 1,
          AND: {
            tracks: {
              has: id,
            },
          },
        },
      });

      await this.prisma.favorites.update({
        where: {
          id: 1,
        },
        data: {
          tracks: {
            set: track.tracks.filter((el) => el !== id),
          },
        },
      });

      return track;
    } catch {
      return undefined;
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.prisma.album.findUnique({ where: { id } });

      if (album) {
        const favorite = await this.getFavoritesDb();

        if (!favorite.albums.includes(id)) {
          await this.prisma.favorites.update({
            where: {
              id: 1,
            },
            data: {
              albums: {
                push: id,
              },
            },
          });
        }
      }

      return album;
    } catch {
      return undefined;
    }
  }

  async deleteAlbum(id: string) {
    try {
      const album = await this.prisma.favorites.findUnique({
        where: {
          id: 1,
          AND: {
            albums: {
              has: id,
            },
          },
        },
      });

      await this.prisma.favorites.update({
        where: {
          id: 1,
        },
        data: {
          albums: {
            set: album.albums.filter((el) => el !== id),
          },
        },
      });

      return album;
    } catch {
      return undefined;
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.prisma.artist.findUnique({ where: { id } });

      if (artist) {
        const favorite = await this.getFavoritesDb();

        if (!favorite.artists.includes(id)) {
          await this.prisma.favorites.update({
            where: {
              id: 1,
            },
            data: {
              artists: {
                push: id,
              },
            },
          });
        }
      }

      return artist;
    } catch {
      return undefined;
    }
  }

  async deleteArtist(id: string) {
    try {
      const artist = await this.prisma.favorites.findUnique({
        where: {
          id: 1,
          AND: {
            artists: {
              has: id,
            },
          },
        },
      });

      await this.prisma.favorites.update({
        where: {
          id: 1,
        },
        data: {
          artists: {
            set: artist.artists.filter((el) => el !== id),
          },
        },
      });

      return artist;
    } catch {
      return undefined;
    }
  }
}
