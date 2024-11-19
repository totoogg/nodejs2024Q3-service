import { Global, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { PrismaService } from './db/dbPrisma.service';
import { CustomLogger } from './logger/logger.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { AllExceptionsFilter } from './logger/allExceptionsFilter.';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    AuthModule,
  ],
  providers: [
    PrismaService,
    CustomLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [PrismaService, CustomLogger],
})
export class AppModule {}
