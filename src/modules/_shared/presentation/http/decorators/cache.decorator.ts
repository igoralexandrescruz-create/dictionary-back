import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache';

export interface CacheOptions {
    key: string;
    ttl?: number;
    includeUserId?: boolean; // O cache deve levar em consideração o id do usuário
}

export const Cache = (options: CacheOptions) => SetMetadata(CACHE_KEY, options);
