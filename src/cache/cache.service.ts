import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
import { env } from '../lib/env';

export const injectKey = 'CACHE_SERVICE';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private client: Redis.Redis;

  onModuleInit() {
    this.client = new Redis.Redis(env.REDIS_URL);
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async set(key: string, otp: string, ttlInSeconds: number): Promise<void> {
    ttlInSeconds === 0
      ? await this.client.set(key, otp)
      : await this.client.set(key, otp, 'EX', ttlInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}
