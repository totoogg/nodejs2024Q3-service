import { Global, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { DbService } from './db/db.service';
import { PrismaService } from './db/dbPrisma.service';

@Global()
@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
  ],
  providers: [DbService, PrismaService],
  exports: [DbService, PrismaService],
})
export class AppModule {}
