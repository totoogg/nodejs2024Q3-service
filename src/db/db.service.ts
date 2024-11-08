import { Injectable } from '@nestjs/common';
import { IAlbum, IArtist, IFavorites, ITrack, IUser } from './db.model';

@Injectable()
export class DbService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private artists: IArtist[] = [];
  private albums: IAlbum[] = [];
  private favorites: IFavorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  getUsers() {
    return Promise.resolve(this.users);
  }

  getUserById(id: string) {
    const user = this.users.find((el) => el.id === id);

    return Promise.resolve(user);
  }

  getUserByLogin(login: string) {
    const user = this.users.find((el) => el.login === login);

    return Promise.resolve(user);
  }

  createUser(user: IUser) {
    this.users.push(user);

    return Promise.resolve(user);
  }

  updateUser(id: string, data) {
    const index = this.users.findIndex((el) => el.id === id);
    this.users[index] = {
      ...this.users[index],
      ...data,
    };
    const user = this.users.find((el) => el.id === id);

    return Promise.resolve(user);
  }

  deleteUser(id: string) {
    this.users = this.users.filter((el) => el.id !== id);

    return Promise.resolve(true);
  }

  getTracks() {
    return Promise.resolve(this.tracks);
  }

  getTrackById(id: string) {
    const track = this.tracks.find((el) => el.id === id);

    return Promise.resolve(track);
  }

  createTrack(track: ITrack) {
    this.tracks.push(track);

    return Promise.resolve(track);
  }

  updateTrack(id: string, data) {
    const index = this.tracks.findIndex((el) => el.id === id);
    this.tracks[index] = {
      ...this.tracks[index],
      ...data,
    };
    const track = this.tracks.find((el) => el.id === id);

    return Promise.resolve(track);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((el) => el.id !== id);

    return Promise.resolve(true);
  }

  getArtists() {
    return Promise.resolve(this.artists);
  }

  getArtistById(id: string) {
    const artist = this.artists.find((el) => el.id === id);

    return Promise.resolve(artist);
  }

  createArtist(artist: IArtist) {
    this.artists.push(artist);

    return Promise.resolve(artist);
  }

  updateArtist(id: string, data) {
    const index = this.artists.findIndex((el) => el.id === id);
    this.artists[index] = {
      ...this.artists[index],
      ...data,
    };
    const artist = this.artists.find((el) => el.id === id);

    return Promise.resolve(artist);
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((el) => el.id !== id);

    return Promise.resolve(true);
  }

  getAlbums() {
    return Promise.resolve(this.albums);
  }

  getAlbumById(id: string) {
    const album = this.albums.find((el) => el.id === id);

    return Promise.resolve(album);
  }

  createAlbum(album: IAlbum) {
    this.albums.push(album);

    return Promise.resolve(album);
  }

  updateAlbum(id: string, data) {
    const index = this.albums.findIndex((el) => el.id === id);
    this.albums[index] = {
      ...this.albums[index],
      ...data,
    };
    const album = this.albums.find((el) => el.id === id);

    return Promise.resolve(album);
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((el) => el.id !== id);

    return Promise.resolve(true);
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  addTrack(id: string) {
    this.favorites.tracks.push(id);

    return Promise.resolve(true);
  }

  checkTrack(id: string) {
    const res = this.favorites.tracks.includes(id);

    return Promise.resolve(res);
  }

  deleteFavoriteTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter((el) => el !== id);

    return Promise.resolve(true);
  }

  addAlbum(id: string) {
    this.favorites.albums.push(id);

    return Promise.resolve(true);
  }

  checkAlbum(id: string) {
    const res = this.favorites.albums.includes(id);

    return Promise.resolve(res);
  }

  deleteFavoriteAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((el) => el !== id);

    return Promise.resolve(true);
  }

  addArtist(id: string) {
    this.favorites.artists.push(id);

    return Promise.resolve(true);
  }

  checkArtist(id: string) {
    const res = this.favorites.artists.includes(id);

    return Promise.resolve(res);
  }

  deleteFavoriteArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter((el) => el !== id);

    return Promise.resolve(true);
  }
}
