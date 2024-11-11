import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './entities/user.entities';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/db/dbPrisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        password: false,
      },
    });

    return users as IUser[];
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          password: false,
        },
      });

      return user;
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
        const userData: IUser = {
          id: uuidv4(),
          login,
          password,
          version: 1,
          createdAt: time,
          updatedAt: time,
        };

        return await this.prisma.user.create({
          data: userData,
          select: {
            password: false,
          },
        });
      }

      return user;
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
        if (user.password !== data.oldPassword) {
          return '403';
        }

        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            password: data.newPassword,
            version: user.version + 1,
            updatedAt: new Date().getTime(),
          },
          select: {
            password: false,
          },
        });
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
