import { SigninUsecase, SignupUsecase } from "./application/use-cases";
import { SigninController, SignupController } from "./presentation/http/controllers";
import { UserRepositoryOrmModule } from "src/modules/users/infra/repositories/user/user.repository.orm.module";
import { Module } from "@nestjs/common";
import { LoginLogRepositoryOrmModule } from "./infra/repositories/login-log/login-log.repository.orm.module";

@Module({
    imports: [
        UserRepositoryOrmModule.register(),
        LoginLogRepositoryOrmModule.register(),
    ],
    controllers: [SignupController, SigninController],
    providers: [SignupUsecase, SigninUsecase],
    exports: [SignupUsecase, SigninUsecase],
})
export class AuthModule { }