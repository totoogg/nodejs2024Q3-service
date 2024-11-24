import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './entities/user.entities';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/db/dbPrisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return users.map((el) => ({
      ...el,
      version: Number(el.version),
      createdAt: Number(el.createdAt),
      updatedAt: Number(el.updatedAt),
    }));
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          login: true,
          version: true,
          updatedAt: true,
          createdAt: true,
        },
      });

      return {
        ...user,
        version: Number(user.version),
        createdAt: Number(user.createdAt),
        updatedAt: Number(user.updatedAt),
      };
    } catch {
      return undefined;
    }
  }

  async getUserByLogin(login: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { login },
      });

      if (!user) return user;

      return {
        ...user,
        version: Number(user.version),
        createdAt: Number(user.createdAt),
        updatedAt: Number(user.updatedAt),
      };
    } catch {
      return undefined;
    }
  }

  async createUser(data: CreateUserDto) {
    const { login, password } = data;
    try {
      const user = await this.prisma.user.findUnique({
        where: { login },
      });

      if (!user) {
        const time = new Date().getTime();
        const salt = Number(process.env.CRYPT_SALT || '10');
        const userData: IUser = {
          id: uuidv4(),
          login,
          password: await bcrypt.hash(password, salt),
          version: 1,
          createdAt: time,
          updatedAt: time,
        };

        const res = await this.prisma.user.create({
          data: userData,
          select: {
            id: true,
            login: true,
            version: true,
            updatedAt: true,
            createdAt: true,
          },
        });

        return {
          ...res,
          version: Number(res.version),
          createdAt: Number(res.createdAt),
          updatedAt: Number(res.updatedAt),
        };
      }

      return null;
    } catch {
      return undefined;
    }
  }

  async updateUser(id: string, data: UpdatePasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (user) {
        if (!(await bcrypt.compare(data.oldPassword, user.password))) {
          return '403';
        }

        const salt = Number(process.env.CRYPT_SALT || '10');
        const res = await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            password: await bcrypt.hash(data.newPassword, salt),
            version: Number(user.version) + 1,
            updatedAt: new Date().getTime(),
          },
          select: {
            id: true,
            login: true,
            version: true,
            updatedAt: true,
            createdAt: true,
          },
        });

        return {
          ...res,
          version: Number(res.version),
          createdAt: Number(res.createdAt),
          updatedAt: Number(res.updatedAt),
        };
      }

      return '404';
    } catch {
      return undefined;
    }
  }

  async deleteUserById(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch {
      return undefined;
    }
  }
}
