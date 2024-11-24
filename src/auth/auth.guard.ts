import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as url from 'node:url';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const allowedPaths = ['auth/signup', 'auth/login', 'doc', ''];

    if (
      allowedPaths.includes(
        url.parse(request.url).pathname.split('/').slice(1, 3).join('/'),
      )
    ) {
      return true;
    }

    if (!token) {
      throw new HttpException(`User is not authorized`, 401);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY || 'secret123123',
      });

      request['user'] = payload;
    } catch {
      throw new HttpException(`User is not authorized`, 401);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
