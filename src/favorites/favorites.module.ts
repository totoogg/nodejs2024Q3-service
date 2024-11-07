import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
