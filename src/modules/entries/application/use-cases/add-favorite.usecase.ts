import { AddFavoriteInput, AddFavoriteOutput } from "src/modules/entries/application/dto/add-favorite.dto";
import { ENTRIES_PORT_TOKENS } from "src/modules/entries/domain/port/tokens";
import { EntriesRepositoryPort } from "src/modules/entries/domain/port/entries.repository.port";
import { Usecase } from "src/modules/_shared/application/usecase.generic";
import { Inject } from "@nestjs/common";

export class AddFavoriteUsecase extends Usecase<AddFavoriteInput, AddFavoriteOutput> {
    constructor(
        @Inject(ENTRIES_PORT_TOKENS.REPOSITORY)
        private readonly repository: EntriesRepositoryPort,
    ) {
        super('AddFavoriteUsecase', 'V1');
    }

    async handleUsecase(params: AddFavoriteInput): Promise<Usecase.Response<AddFavoriteOutput>> {
        const { word, idUser } = params;
        const entry = await this.repository.findByWord({ word });
        if (!entry) {
            return {
                data: { success: false },
                error: 'Palavra não encontrada',
            };
        }
        const favorite = await this.repository.findFavoriteById({ idUser, idEntry: entry.id });
        if (favorite) {
            return {
                data: { success: false },
                error: 'Palavra já favoritada',
            };
        }
        await this.repository.addFavorite({ idEntry: entry.id, idUser });

        return {
            data: {
                success: true,
            },
            error: null,
        };
    }
}
