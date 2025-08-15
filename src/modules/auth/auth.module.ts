import { SigninUsecase } from "./application/use-cases/signin/signin-usecase";
import { SigninController } from "./presentation/http/controllers/signin.controller";
import { UserRepositoryOrmModule } from "src/modules/users/infra/repositories/user.repository.orm.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        UserRepositoryOrmModule.register(),
    ],
    controllers: [SigninController],
    providers: [SigninUsecase],
    exports: [SigninUsecase],
})
export class AuthModule { }