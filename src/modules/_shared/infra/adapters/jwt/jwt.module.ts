import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtAdapter } from './jwt.adapter';
import { SHARED_PORT_TOKENS } from 'src/modules/_shared/application/ports/tokens';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';

@Global()
@Module({})
export class AppJwtModule {
  static register(): DynamicModule {
    const provider = {
      provide: SHARED_PORT_TOKENS.JWT,
      useFactory: () => {
        return JwtAdapter.getInstance();
      },
      inject: [],
    };

    return {
      module: AppJwtModule,
      imports: [
        JwtModule.register({
          global: true,
          secret: env.security.jwt.jwtSecret,
          signOptions: { expiresIn: `${env.security.jwt.jwtExpiresIn}m` },
        }),
      ],
      providers: [provider],
      exports: [provider],
    };
  }
}
