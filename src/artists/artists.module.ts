import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
