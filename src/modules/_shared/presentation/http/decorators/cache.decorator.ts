import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache';

export interface CacheOptions {
    key: string;
    ttl?: number;
}

export const Cache = (options: CacheOptions) => SetMetadata(CACHE_KEY, options);
