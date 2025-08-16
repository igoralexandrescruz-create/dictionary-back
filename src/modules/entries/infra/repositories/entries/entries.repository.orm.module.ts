import { EntriesRepositoryOrm } from './entries.repository.orm';
import { EntryOrm, FavoritesOrm, HistoryOrm } from 'src/modules/entries/infra/entities';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTRIES_PORT_TOKENS } from 'src/modules/entries/domain/port/tokens';

@Global()
@Module({})
export class EntriesRepositoryOrmModule {
    static register(): DynamicModule {
        const userProvider = {
            provide: ENTRIES_PORT_TOKENS.REPOSITORY,
            useFactory: (repo: EntriesRepositoryOrm) => repo,
            inject: [EntriesRepositoryOrm],
        };

        return {
            module: EntriesRepositoryOrmModule,
            imports: [TypeOrmModule.forFeature([EntryOrm, FavoritesOrm, HistoryOrm])],
            providers: [EntriesRepositoryOrm, userProvider],
            exports: [userProvider],
        };
    }
} 