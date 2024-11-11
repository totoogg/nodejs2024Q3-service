import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './entities/track.entities';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/db/dbPrisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    const tracks = await this.prisma.track.findMany();

    return tracks;
  }

  async getTrackById(id: string) {
    try {
      const track = await this.prisma.track.findUnique({ where: { id } });

      return track;
    } catch {
      return undefined;
    }
  }

  async createTrack(data: CreateTrackDto) {
    const { name, duration, albumId, artistId } = data;
    const trackData: ITrack = {
      id: uuidv4(),
      name,
      duration,
      albumId: albumId || null,
      artistId: artistId || null,
    };
    const track = await this.prisma.track.create({ data: trackData });

    return track;
  }

  async updateTrack(id: string, data: UpdateTrackDto) {
    try {
      const track = await this.prisma.track.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          duration: data.duration,
          albumId: data.albumId || null,
          artistId: data.artistId || null,
        },
      });

      return track;
    } catch {
      return undefined;
    }
  }

  async deleteTrackById(id: string) {
    try {
      const track = await this.prisma.track.delete({
        where: {
          id,
        },
      });

      const trackFav = await this.prisma.favorites.findUnique({
        where: {
          id: 1,
          AND: {
            tracks: {
              has: id,
            },
          },
        },
      });

      if (trackFav) {
        await this.prisma.favorites.update({
          where: {
            id: 1,
          },
          data: {
            tracks: {
              set: trackFav.tracks.filter((el) => el !== id),
            },
          },
        });
      }

      return track;
    } catch {
      return undefined;
    }
  }
}
