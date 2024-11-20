import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() postData: LoginUserDto) {
    return this.authService.signup(postData.login, postData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() postData: LoginUserDto) {
    return this.authService.login(postData.login, postData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() postData: RefreshTokenDto) {
    return this.authService.refresh(postData.refreshToken);
  }
}
