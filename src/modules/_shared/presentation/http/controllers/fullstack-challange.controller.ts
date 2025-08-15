import { FullstackChallangeSwagger } from "./fullstack-challange.swagger";
import { Public } from "src/modules/_shared/presentation/http/decorators/public.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, HttpCode } from "@nestjs/common";

@ApiTags('Fullstack Challenge')
@Controller('')
export class FullstackChallangeController {

    @Public()
    @ApiOkResponse(FullstackChallangeSwagger.ApiWelcomeDescription)
    @HttpCode(200)
    @Get('')
    async welcome(): Promise<{ message: string }> {
        return {
            message: "Fullstack Challenge 🏅 - Dictionary"
        }
    }
}