import { AuthSwagger } from "./login.swagger";
import { LoginUsecase } from "src/modules/auth/application/use-cases/login/login-usecase";
import {
    LoginControllerInputDTO,
    LoginControllerOutputDTO
} from "src/modules/auth/presentation/http/dto/login-controller.dto";
import { Public } from "src/modules/_shared/presentation/http/decorators/public.decorator";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";

@ApiTags('Auth')
@Controller({
    path: '',
    version: '1',
})
export class LoginController {
    constructor(private readonly loginUsecase: LoginUsecase) { }

    @Public()
    @ApiOkResponse(AuthSwagger.ApiLoginOK)
    @ApiUnauthorizedResponse(AuthSwagger.ApiLoginUnauthorized)
    @ApiBadRequestResponse(AuthSwagger.ApiLoginBadRequest)
    @ApiOperation(AuthSwagger.ApiLoginDescription)
    @HttpCode(200)
    @Post('login')
    async login(
        @Body() { email, password }: LoginControllerInputDTO
    ): Promise<LoginControllerOutputDTO> {
        const { data, error } = await this.loginUsecase.execute({
            email,
            password,
        });
        if (error) {
            throw new UnauthorizedException(error);
        }
        return {
            id: data.user.id,
            name: data.user.name,
            token: data.token,
        };
    }
}