import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
