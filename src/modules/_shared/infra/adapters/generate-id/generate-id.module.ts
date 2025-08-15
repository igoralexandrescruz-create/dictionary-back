import { DynamicModule, Global, Module } from '@nestjs/common';
import { ULIDAdapter } from './ulid.adapter';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';

@Global()
@Module({})
export class GenerateIdModule {
  static register(): DynamicModule {
    const provider = {
      provide: SHARED_PORT_TOKENS.GENERATE_ID,
      useFactory: (ulid: ULIDAdapter) => {
        return ulid;
      },
      inject: [ULIDAdapter],
    };

    return {
      module: GenerateIdModule,
      providers: [ULIDAdapter, provider],
      exports: [provider],
    };
  }
}
