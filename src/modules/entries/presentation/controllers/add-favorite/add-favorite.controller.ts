import { AddFavoriteSwagger } from "./add-favorite.swagger";
import { AddFavoriteUsecase } from "src/modules/entries/application/use-cases/add-favorite.usecase";
import { AddFavoriteControllerInputDTO, AddFavoriteControllerOutputDTO } from "src/modules/entries/presentation/dto/add-favorite-controller.dto";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequestException, Body, Controller, HttpCode, Param, Post, Request } from "@nestjs/common";

@ApiTags('Entries')
@Controller('entries')
export class AddFavoriteController {
    constructor(private readonly addFavoriteUsecase: AddFavoriteUsecase) { }

    @ApiBearerAuth()
    @ApiOkResponse(AddFavoriteSwagger.ApiAddFavoriteOK)
    @ApiBadRequestResponse(AddFavoriteSwagger.ApiAddFavoriteBadRequest)
    @ApiOperation(AddFavoriteSwagger.ApiAddFavoriteDescription)
    @HttpCode(201)
    @Post('en/:word/favorite')
    async addFavorite(
        @Param() { word }: AddFavoriteControllerInputDTO,
        @Request() req
    ): Promise<AddFavoriteControllerOutputDTO> {
        const user = req.user;
        const { data, error } = await this.addFavoriteUsecase.execute({ word, idUser: user.id });

        if (error) {
            throw new BadRequestException(error);
        }

        return data;
    }
}
