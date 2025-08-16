import { RemoveFavoriteInput, RemoveFavoriteOutput } from "src/modules/entries/application/dto/remove-favorite.dto";
import { ENTRIES_PORT_TOKENS } from "src/modules/entries/domain/port/tokens";
import { EntriesRepositoryPort } from "src/modules/entries/domain/port/entries.repository.port";
import { Usecase } from "src/modules/_shared/application/usecase.generic";
import { Inject } from "@nestjs/common";

export class RemoveFavoriteUsecase extends Usecase<RemoveFavoriteInput, RemoveFavoriteOutput> {
    constructor(
        @Inject(ENTRIES_PORT_TOKENS.REPOSITORY)
        private readonly repository: EntriesRepositoryPort,
    ) {
        super('RemoveFavoriteUsecase', 'V1');
    }

    async handleUsecase(params: RemoveFavoriteInput): Promise<Usecase.Response<RemoveFavoriteOutput>> {
        const { word, idUser } = params;
        const entry = await this.repository.findByWord({ word });
        if (!entry) {
            return {
                data: { success: false },
                error: 'Palavra não encontrada',
            };
        }
        const favorite = await this.repository.findFavoriteById({ idUser, idEntry: entry.id });
        if (!favorite) {
            return {
                data: { success: false },
                error: 'Palavra não favoritada',
            };
        }
        await this.repository.removeFavorite({ idEntry: entry.id, idUser });

        return {
            data: {
                success: true,
            },
            error: null,
        };
    }
}
