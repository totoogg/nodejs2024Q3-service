import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './entities/artist.entities';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/db/dbPrisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    const artists = await this.prisma.artist.findMany();

    return artists;
  }

  async getArtistById(id: string) {
    try {
      const artist = await this.prisma.artist.findUnique({ where: { id } });

      return artist;
    } catch {
      return undefined;
    }
  }

  async createArtist(data: CreateArtistDto) {
    const { name, grammy } = data;
    const artistData: IArtist = {
      id: uuidv4(),
      name,
      grammy,
    };

    const artist = await this.prisma.artist.create({ data: artistData });

    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDto) {
    try {
      const artist = await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          grammy: data.grammy,
        },
      });

      return artist;
    } catch {
      return undefined;
    }
  }

  async deleteArtistById(id: string) {
    try {
      const artist = await this.prisma.artist.delete({
        where: {
          id,
        },
      });

      const artistFav = await this.prisma.favorites.findUnique({
        where: {
          id: 1,
          AND: {
            artists: {
              has: id,
            },
          },
        },
      });

      if (artistFav) {
        await this.prisma.favorites.update({
          where: {
            id: 1,
          },
          data: {
            artists: {
              set: artistFav.artists.filter((el) => el !== id),
            },
          },
        });
      }

      return artist;
    } catch {
      return undefined;
    }
  }
}
