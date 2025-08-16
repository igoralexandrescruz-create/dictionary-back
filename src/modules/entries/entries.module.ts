import { FindEntriesUsecase } from "./application/use-cases/find-entries.usecase";
import { FindEntriesController } from "./presentation/controllers";
import { EntriesRepositoryOrmModule } from "./infra/repositories/entries/entries.repository.orm.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        EntriesRepositoryOrmModule.register(),
    ],
    controllers: [FindEntriesController],
    providers: [FindEntriesUsecase],
    exports: [FindEntriesUsecase],
})
export class EntriesModule { }