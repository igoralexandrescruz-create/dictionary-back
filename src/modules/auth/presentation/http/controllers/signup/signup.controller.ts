import { SignupSwagger } from "./signup.swagger";
import { SignupUsecase } from "src/modules/auth/application/use-cases";
import { SignupControllerInputDTO, SignupControllerOutputDTO } from "src/modules/auth/presentation/http/dto/signup-controller.dto";
import { Public } from "src/modules/_shared/presentation/http/decorators/public.decorator";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";

@ApiTags('Auth')
@Controller('auth')
export class SignupController {
    constructor(private readonly signupUsecase: SignupUsecase) { }

    @Public()
    @ApiOkResponse(SignupSwagger.ApiSignupOK)
    @ApiBadRequestResponse(SignupSwagger.ApiSignupBadRequest)
    @ApiOperation(SignupSwagger.ApiSignupDescription)
    @HttpCode(200)
    @Post('signup')
    async signup(
        @Body() { email, password, name }: SignupControllerInputDTO
    ): Promise<SignupControllerOutputDTO> {
        const { data, error } = await this.signupUsecase.execute({
            email,
            password,
            name
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