import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() postData: LoginUserDto) {
    const user = await this.authService.signup(
      postData.login,
      postData.password,
    );

    if (!user) {
      throw new HttpException(
        { message: [`User with login ${postData.login} exists`] },
        404,
      );
    }

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() postData: LoginUserDto) {
    const tokens = await this.authService.login(
      postData.login,
      postData.password,
    );

    if (!tokens) {
      throw new HttpException(
        { message: [`Login or password is incorrect`] },
        403,
      );
    }

    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() postData: RefreshTokenDto) {
    if (!postData.refreshToken || typeof postData.refreshToken !== 'string') {
      throw new HttpException(
        {
          message: [
            `RefreshToken must be a string, refreshToken should not be empty`,
          ],
        },
        401,
      );
    }

    const tokens = await this.authService.refresh(postData.refreshToken);

    if (!tokens) {
      throw new HttpException(
        { message: [`Refresh token is invalid or expired`] },
        403,
      );
    }

    if (tokens?.error === '404') {
      throw new HttpException(
        { message: [`User with id ${tokens.id} does not exist`] },
        404,
      );
    }

    return tokens;
  }
}
