import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getUsers(): Promise<Omit<IUser, 'password'>[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(`User with id ${id} does not exist`, 404);
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async createUser(@Body() postData: CreateUserDto) {
    const user = await this.usersService.createUser(postData);

    if (!user) {
      throw new HttpException(`User with login ${postData.login} exists`, 404);
    }

    return user;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() postData: UpdatePasswordDto,
  ) {
    const user = await this.usersService.updateUser(id, postData);

    if (user === '404') {
      throw new HttpException(`User with id ${id} does not exist`, 404);
    }

    if (user === '403') {
      throw new HttpException(`Incorrect old password`, 403);
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const user = await this.usersService.deleteUserById(id);

    if (!user) {
      throw new HttpException(`User with id ${id} does not exist`, 404);
    }
  }
}
