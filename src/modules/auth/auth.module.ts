import { LoginUsecase } from "./application/use-cases/login/login-usecase";
import { LoginController } from "./presentation/http/controllers/login.controller";
import { UserRepositoryOrmModule } from "src/modules/users/infra/repositories/user.repository.orm.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        UserRepositoryOrmModule.register(),
    ],
    controllers: [LoginController],
    providers: [LoginUsecase],
    exports: [LoginUsecase],
})
export class AuthModule { }