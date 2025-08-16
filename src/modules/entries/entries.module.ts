import { FindEntriesUsecase } from "./application/use-cases/find-entries.usecase";
import { AddFavoriteUsecase } from "./application/use-cases/add-favorite.usecase";
import { RemoveFavoriteUsecase } from "./application/use-cases/remove-favorite.usecase";
import {
    FindEntriesController,
    AddFavoriteController,
    RemoveFavoriteController,
} from "./presentation/controllers";
import { EntriesRepositoryOrmModule } from "./infra/repositories/entries/entries.repository.orm.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        EntriesRepositoryOrmModule.register(),
    ],
    controllers: [
        FindEntriesController,
        AddFavoriteController,
        RemoveFavoriteController,
    ],
    providers: [
        FindEntriesUsecase,
        AddFavoriteUsecase,
        RemoveFavoriteUsecase,
    ],
    exports: [
        FindEntriesUsecase,
        AddFavoriteUsecase,
        RemoveFavoriteUsecase,
    ],
})
export class EntriesModule { }