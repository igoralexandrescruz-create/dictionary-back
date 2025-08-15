import { UserRepositoryOrm } from './user.repository.orm';
import { USER_PORT_TOKENS } from 'src/modules/users/domain/ports/tokens';
import { UsersOrm } from 'src/modules/users/infra/entities';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({})
export class UserRepositoryOrmModule {
    static register(): DynamicModule {
        const userProvider = {
            provide: USER_PORT_TOKENS.USER_REPOSITORY,
            useFactory: (repo: UserRepositoryOrm) => repo,
            inject: [UserRepositoryOrm],
        };

        return {
            module: UserRepositoryOrmModule,
            imports: [TypeOrmModule.forFeature([UsersOrm])],
            providers: [UserRepositoryOrm, userProvider],
            exports: [userProvider],
        };
    }
} 