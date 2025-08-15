import { RedisAdapter } from './redis.adapter';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class CacheModule {
  static register(): DynamicModule {
    const provider = {
      provide: SHARED_PORT_TOKENS.CACHE,
      useFactory: () => {
        return RedisAdapter.getInstance();
      },
      inject: [],
    };

    return {
      module: CacheModule,
      imports: [],
      providers: [provider],
      exports: [provider],
    };
  }
}