import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './entities/album.entities';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/db/dbPrisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async getAlbums() {
    const albums = await this.prisma.album.findMany();

    return albums;
  }

  async getAlbumById(id: string) {
    try {
      const album = await this.prisma.album.findUnique({ where: { id } });

      return album;
    } catch {
      return undefined;
    }
  }

  async createAlbum(data: CreateAlbumDto) {
    const { name, year, artistId } = data;
    const albumData: IAlbum = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    const album = await this.prisma.album.create({ data: albumData });

    return album;
  }

  async updateAlbum(id: string, data: UpdateAlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          year: data.year,
          artistId: data.artistId || null,
        },
      });
      return album;
    } catch {
      return undefined;
    }
  }

  async deleteAlbumById(id: string) {
    try {
      const album = await this.prisma.album.delete({
        where: {
          id,
        },
      });
      return album;
    } catch {
      return undefined;
    }
  }
}
