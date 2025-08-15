import { LoginLogRepositoryOrm } from './login-log.repository.orm';
import { LogLoginOrm } from 'src/modules/_shared/infra/entities';
import { AUTH_PORT_TOKENS } from 'src/modules/auth/domain/ports/tokens';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({})
export class LoginLogRepositoryOrmModule {
    static register(): DynamicModule {
        const userProvider = {
            provide: AUTH_PORT_TOKENS.LOGIN_LOG_REPOSITORY,
            useFactory: (repo: LoginLogRepositoryOrm) => repo,
            inject: [LoginLogRepositoryOrm],
        };

        return {
            module: LoginLogRepositoryOrmModule,
            imports: [TypeOrmModule.forFeature([LogLoginOrm])],
            providers: [LoginLogRepositoryOrm, userProvider],
            exports: [userProvider],
        };
    }
} 