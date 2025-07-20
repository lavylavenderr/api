import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './guards/authorization.guard';
import { RandomModule } from './routers/util/util.module';
import { SpotifyModule } from './routers/spotify/spotify.module';
import { ConfigModule } from '@nestjs/config';
import { BadgeModule } from './routers/badge/badge.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    RandomModule,
    SpotifyModule,
    BadgeModule,
    CacheModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
