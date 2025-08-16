import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { buildCacheKeys } from 'src/modules/_shared/application/utils/build-cache-keys';
import { CACHE_KEY, CacheOptions } from '../decorators/cache.decorator';
import { CachePort } from 'src/modules/_shared/application/ports/cache.port';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        @Inject(SHARED_PORT_TOKENS.CACHE)
        private readonly cache: CachePort,
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const cacheOptions = this.reflector.get<CacheOptions>(CACHE_KEY, context.getHandler());
        const startTime = Date.now();

        if (!cacheOptions) {
            return next.handle().pipe(
                tap(() => {
                    const response = context.switchToHttp().getResponse<Response>();
                    const responseTime = Date.now() - startTime;
                    response.setHeader('x-response-time', `${responseTime}ms`);
                })
            );
        }

        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { key, ttl = 3600 } = cacheOptions;

        const queryParams = request.query as Record<string, any>;
        const cacheKey = buildCacheKeys(key, queryParams);

        try {
            const cachedResult = await this.cache.get(cacheKey);

            if (cachedResult) {
                const responseTime = Date.now() - startTime;
                response.setHeader('x-cache', 'HIT');
                response.setHeader('x-response-time', `${responseTime}ms`);
                return of(cachedResult);
            }

            response.setHeader('x-cache', 'MISS');
            return next.handle().pipe(
                tap(async (result) => {
                    const responseTime = Date.now() - startTime;
                    response.setHeader('x-response-time', `${responseTime}ms`);

                    if (result) {
                        await this.cache.set(cacheKey, result, ttl);
                    }
                })
            );
        } catch (error) {
            console.error('Cache error:', error);
            const responseTime = Date.now() - startTime;
            response.setHeader('x-cache', 'MISS');
            response.setHeader('x-response-time', `${responseTime}ms`);
            return next.handle();
        }
    }
}
