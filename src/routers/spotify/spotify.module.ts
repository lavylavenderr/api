import { SpotifyController } from './spotify.controller';
import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { CacheService, injectKey } from 'src/cache/cache.service';

@Module({
  controllers: [SpotifyController],
  providers: [
    SpotifyService,
    {
      useClass: CacheService,
      provide: injectKey,
    },
  ],
})
export class SpotifyModule {}
