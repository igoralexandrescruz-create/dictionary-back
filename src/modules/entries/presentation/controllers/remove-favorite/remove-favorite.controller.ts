import { RemoveFavoriteSwagger } from "./remove-favorite.swagger";
import { RemoveFavoriteUsecase } from "src/modules/entries/application/use-cases/remove-favorite.usecase";
import { RemoveFavoriteControllerInputDTO, RemoveFavoriteControllerOutputDTO } from "src/modules/entries/presentation/dto/remove-favorite-controller.dto";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequestException, Controller, Delete, HttpCode, Param, Request } from "@nestjs/common";

@ApiTags('Entries')
@Controller('entries')
export class RemoveFavoriteController {
    constructor(private readonly removeFavoriteUsecase: RemoveFavoriteUsecase) { }

    @ApiBearerAuth()
    @ApiOkResponse(RemoveFavoriteSwagger.ApiRemoveFavoriteOK)
    @ApiBadRequestResponse(RemoveFavoriteSwagger.ApiRemoveFavoriteBadRequest)
    @ApiOperation(RemoveFavoriteSwagger.ApiRemoveFavoriteDescription)
    @HttpCode(200)
    @Delete('en/:word/unfavorite')
    async removeFavorite(
        @Param() { word }: RemoveFavoriteControllerInputDTO,
        @Request() req
    ): Promise<RemoveFavoriteControllerOutputDTO> {
        const user = req.user;
        const { data, error } = await this.removeFavoriteUsecase.execute({ word, idUser: user.id });

        if (error) {
            throw new BadRequestException(error);
        }

        return data;
    }
}
