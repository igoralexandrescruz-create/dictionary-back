import { DynamicModule, Global, Module } from '@nestjs/common';
import { LogAdapter } from './log.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogGenericOrm } from '../../entities/generic-orm';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';

@Global()
@Module({})
export class LogModule {
  static register(): DynamicModule {
    const provider = {
      provide: SHARED_PORT_TOKENS.LOG,
      useFactory: (log: LogAdapter) => {
        return log;
      },
      inject: [LogAdapter],
    };

    return {
      module: LogModule,
      imports: [
        TypeOrmModule.forFeature([LogGenericOrm]),
      ],
      providers: [LogAdapter, provider],
      exports: [provider],
    };
  }
}
