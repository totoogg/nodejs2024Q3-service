import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './entities/track.entities';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DbService) {}

  async getTracks() {
    const tracks = await this.db.getTracks();

    return tracks;
  }

  async getTrackById(id: string) {
    const track = await this.db.getTrackById(id);

    return track;
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
    const track = await this.db.createTrack(trackData);

    return track;
  }

  async updateTrack(id: string, data: UpdateTrackDto) {
    const checkTrack = await this.db.getTrackById(id);

    if (checkTrack) {
      const { name, duration, albumId, artistId } = data;
      const trackData = {
        name,
        duration,
        albumId: albumId || null,
        artistId: artistId || null,
      };

      const track = await this.db.updateTrack(id, trackData);

      return track;
    }

    return checkTrack;
  }

  async deleteTrackById(id: string) {
    const track = await this.db.getTrackById(id);

    if (track) {
      const res = await this.db.deleteTrack(id);

      await this.db.deleteFavoriteTrack(id);

      return res;
    }

    return track;
  }
}
