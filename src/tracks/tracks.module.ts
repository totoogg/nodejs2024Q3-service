import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
