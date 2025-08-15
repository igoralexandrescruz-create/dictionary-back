import { DynamicModule, Global, Module } from '@nestjs/common';
import { BcryptPort } from './bcrypt.adapter';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';

@Global()
@Module({})
export class HashModule {
  static register(): DynamicModule {
    const provider = {
      provide: SHARED_PORT_TOKENS.HASH,
      useFactory: () => {
        return BcryptPort.getInstance();
      },
      inject: [],
    };

    return {
      module: HashModule,
      imports: [],
      providers: [provider],
      exports: [provider],
    };
  }
}
