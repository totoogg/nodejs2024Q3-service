import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
