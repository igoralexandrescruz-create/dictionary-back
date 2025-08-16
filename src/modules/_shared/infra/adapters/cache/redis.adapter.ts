import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { env } from 'src/config/env';
import { CachePort } from 'src/modules/_shared/application/ports/cache.port';

@Injectable()
export class RedisAdapter implements OnModuleInit, OnModuleDestroy, CachePort {
  private client: Redis;
  private static instance: RedisAdapter;

  public static getInstance(): RedisAdapter {
    if (!this.instance) {
      this.instance = new RedisAdapter();
    }
    return this.instance;
  }

  private constructor() { }

  async onModuleInit() {
    this.client = new Redis({
      host: env.redis.host,
      port: env.redis.port,
      username: env.redis.username,
      password: env.redis.password,
      db: env.redis.db,
    });

    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis server');
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl || 3600);
    return true;
  }

  async del(...keys: string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return this.client.del(keys);
  }

  getClient(): Redis {
    return this.client;
  }
}
