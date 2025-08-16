import { FindEntriesSwagger } from "./find-entries.swagger";
import { FindEntriesUsecase } from "src/modules/entries/application/use-cases/find-entries.usecase";
import { FindEntriesControllerInputDTO, FindEntriesControllerOutputDTO } from "src/modules/entries/presentation/dto/find-entries-controller.dto";
import { CACHE_KEYS } from "src/modules/_shared/application/contants/keys";
import { Cache } from "src/modules/_shared/presentation/http/decorators/cache.decorator";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequestException, Controller, Get, HttpCode, Query } from "@nestjs/common";

@ApiTags('Entries')
@Controller('entries')
export class FindEntriesController {
    constructor(
        private readonly findEntriesUsecase: FindEntriesUsecase
    ) { }

    @Cache({ key: CACHE_KEYS.ENTRIES, ttl: 3600 })
    @ApiBearerAuth()
    @ApiOkResponse(FindEntriesSwagger.ApiFindEntriesOK)
    @ApiBadRequestResponse(FindEntriesSwagger.ApiFindEntriesBadRequest)
    @ApiOperation(FindEntriesSwagger.ApiFindEntriesDescription)
    @HttpCode(200)
    @Get('/en')
    async find(
        @Query() params: FindEntriesControllerInputDTO
    ): Promise<FindEntriesControllerOutputDTO> {
        const { data, error } = await this.findEntriesUsecase.execute(params);

        if (error) {
            throw new BadRequestException(error);
        }

        return data;
    }
}