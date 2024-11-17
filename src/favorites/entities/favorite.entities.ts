import { IAlbum } from 'src/albums/entities/album.entities';
import { IArtist } from 'src/artists/entities/artist.entities';
import { ITrack } from 'src/tracks/entities/track.entities';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
