import { SigninUsecase, SignupUsecase } from "./application/use-cases";
import { SigninController, SignupController } from "./presentation/http/controllers";
import { UserRepositoryOrmModule } from "src/modules/users/infra/repositories/user.repository.orm.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        UserRepositoryOrmModule.register(),
    ],
    controllers: [SignupController, SigninController],
    providers: [SignupUsecase, SigninUsecase],
    exports: [SignupUsecase, SigninUsecase],
})
export class AuthModule { }