import { DictDatasourcesModule } from 'src/modules/_shared/infra/database/datasources';
import { AppJwtModule } from './_shared/infra/adapters/jwt/jwt.module';
import { HashModule } from './_shared/infra/adapters/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { LogBenchmarkModule } from './_shared/infra/adapters/log-benchmark/log-benchmark.module';
import { LogModule } from './_shared/infra/adapters/log/log.module';
import { CacheModule } from './_shared/infra/adapters/cache/cache.module';
import { SharedModule } from './_shared/shared.module';
import { GenerateIdModule } from './_shared/infra/adapters/generate-id/generate-id.module';
import { HttpModule } from './_shared/infra/adapters/http/http.module';
import { EntriesModule } from './entries/entries.module';
import { AuthGuard } from './_shared/presentation/http/guards/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { CacheInterceptor } from './_shared/presentation/http/interceptors';

@Module({
  imports: [
    DictDatasourcesModule,
    AppJwtModule.register(),
    HashModule.register(),
    CacheModule.register(),
    LogModule.register(),
    LogBenchmarkModule.register(),
    GenerateIdModule.register(),
    HttpModule.register(),
    SharedModule,
    AuthModule,
    EntriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule { }
