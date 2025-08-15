import { Module } from '@nestjs/common';
import { DictDatasourcesModule } from 'src/modules/_shared/infra/database/datasources';
import { AppJwtModule } from './_shared/infra/adapters/jwt/jwt.module';
import { HashModule } from './_shared/infra/adapters/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { LogBenchmarkModule } from './_shared/infra/adapters/log-benchmark/log-benchmark.module';
import { LogModule } from './_shared/infra/adapters/log/log.module';
import { CacheModule } from './_shared/infra/adapters/cache/cache.module';
import { SharedModule } from './_shared/shared.module';

@Module({
  imports: [
    DictDatasourcesModule,
    AppJwtModule.register(),
    HashModule.register(),
    CacheModule.register(),
    LogModule.register(),
    LogBenchmarkModule.register(),
    SharedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
