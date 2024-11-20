import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './entities/payload.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(login: string, password: string) {
    const user = await this.usersService.createUser({ login, password });

    return user;
  }

  async login(login: string, password: string) {
    const user = await this.usersService.getUserByLogin(login);

    if (!user || !(await bcrypt.compare(password, user?.password))) {
      return;
    }

    const payload = { sub: user.id, username: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY || 'secret123123',
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
      }),
    };
  }

  async refresh(token: string) {
    try {
      const payload: IPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
      });

      const user = this.usersService.getUserById(payload.sub);

      if (!user) {
        return {
          id: payload.sub,
          error: '404',
        };
      }

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_KEY || 'secret123123',
          expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
        }),
      };
    } catch {
      return;
    }
  }
}
