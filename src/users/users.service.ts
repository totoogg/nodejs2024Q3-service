import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './entities/user.entities';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async getUsers() {
    const users = await this.db.getUsers();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.db.getUserById(id);

    return user;
  }

  async createUser(data: CreateUserDto) {
    const { login, password } = data;
    const checkUser = await this.db.getUserByLogin(login);

    if (!checkUser) {
      const time = new Date().getTime();
      const userData: IUser = {
        id: uuidv4(),
        login,
        password,
        version: 1,
        createdAt: time,
        updatedAt: time,
      };
      const user = await this.db.createUser(userData);

      return user;
    }

    return null;
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    const checkUser = await this.db.getUserById(id);

    if (checkUser) {
      if (checkUser.password !== data.oldPassword) {
        return '403';
      }

      const updateData = {
        password: data.newPassword,
        version: checkUser.version + 1,
        updatedAt: new Date().getTime(),
      };

      const user = await this.db.updateUser(id, updateData);

      return user;
    }

    return '404';
  }

  async deleteUserById(id: string) {
    const user = await this.db.getUserById(id);

    if (user) {
      const res = await this.db.deleteUser(id);

      return res;
    }

    return user;
  }
}
