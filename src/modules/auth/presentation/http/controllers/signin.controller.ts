import { AuthSwagger } from "./signin.swagger";
import { SigninUsecase } from "src/modules/auth/application/use-cases/signin/signin-usecase";
import {
    SigninControllerInputDTO,
    SigninControllerOutputDTO
} from "src/modules/auth/presentation/http/dto/signin-controller.dto";
import { Public } from "src/modules/_shared/presentation/http/decorators/public.decorator";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";

@ApiTags('Auth')
@Controller({
    path: '',
    version: '1',
})
export class SigninController {
    constructor(private readonly signinUsecase: SigninUsecase) { }

    @Public()
    @ApiOkResponse(AuthSwagger.ApiSigninOK)
    @ApiUnauthorizedResponse(AuthSwagger.ApiSigninUnauthorized)
    @ApiBadRequestResponse(AuthSwagger.ApiSigninBadRequest)
    @ApiOperation(AuthSwagger.ApiSigninDescription)
    @HttpCode(200)
    @Post('signin')
    async signin(
        @Body() { email, password }: SigninControllerInputDTO
    ): Promise<SigninControllerOutputDTO> {
        const { data, error } = await this.signinUsecase.execute({
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