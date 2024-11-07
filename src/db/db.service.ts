import { Injectable } from '@nestjs/common';
import { IUser } from './db.model';

@Injectable()
export class DbService {
  private users: IUser[] = [];

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
    this.users.filter((el) => el.id !== id);

    return Promise.resolve(true);
  }
}
