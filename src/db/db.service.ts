import { Injectable } from '@nestjs/common';
import { ITrack, IUser } from './db.model';

@Injectable()
export class DbService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];

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
}
