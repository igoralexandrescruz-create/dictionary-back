import {
    AddFavoriteRepositoryInput,
    EntriesRepositoryPort,
    Entry,
    FindByWordRepositoryInput,
    FindByWordRepositoryOutput,
    FindEntriesRepositoryInput,
    FindEntriesRepositoryOutput,
    FindFavoriteByIdRepositoryInput,
    FindFavoriteByIdRepositoryOutput,
    FindFavoritesRepositoryInput,
    FindFavoritesRepositoryOutput,
    FindHistoryRepositoryInput,
    FindHistoryRepositoryOutput,
    RemoveFavoriteRepositoryInput,
    SaveHistoryRepositoryInput
} from 'src/modules/entries/domain/port/entries.repository.port';
import { EntryOrm, FavoritesOrm, HistoryOrm } from 'src/modules/entries/infra/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesRepositoryOrm implements EntriesRepositoryPort {
    constructor(
        @InjectRepository(EntryOrm)
        private readonly entriesRepository: Repository<EntryOrm>,
        @InjectRepository(FavoritesOrm)
        private readonly favoritesRepository: Repository<FavoritesOrm>,
        @InjectRepository(HistoryOrm)
        private readonly historyRepository: Repository<HistoryOrm>,
    ) { }

    async findLastHistory(idUser: number): Promise<Entry> {
        const result = await this.historyRepository.createQueryBuilder('history')
            .select('history.id', 'id')
            .addSelect('history.id_entry', 'id_entry')
            .addSelect('entry.word', 'word')
            .addSelect('history.created_at', 'created_at')
            .innerJoin(EntryOrm, 'entry', 'entry.id = history.id_entry')
            .where('history.id_user = :idUser', { idUser })
            .orderBy('history.id', 'DESC')
            .limit(1)
            .getRawOne();

        return result ? {
            id: result.id,
            idEntry: result.id_entry,
            word: result.word,
            createdAt: result.createdAt
        } : null;
    }


    async find(params: FindEntriesRepositoryInput): Promise<FindEntriesRepositoryOutput> {
        const { limit, lastId, search } = params;
        const query = this.entriesRepository.createQueryBuilder('entry').orderBy('entry.id', 'ASC');

        search && query.where('entry.word LIKE :search', { search: `%${search.toLowerCase()}%` });
        lastId && query.andWhere('entry.id > :lastId', { lastId });

        const [entries, total] = await Promise.all([
            query.take(limit).getMany(),
            this.getTotal(params)
        ]);
        return { entries, total };
    }

    async findLastId(): Promise<number> {
        const result = await this.entriesRepository.createQueryBuilder('entry')
            .select('entry.id', 'id')
            .orderBy('entry.id', 'DESC')
            .limit(1)
            .getRawOne();
        return result?.id || 1;
    }

    async findFavorites(params: FindFavoritesRepositoryInput): Promise<FindFavoritesRepositoryOutput> {
        const { idUser } = params;
        const query = this.favoritesRepository.createQueryBuilder('favorite')
            .select('favorite.id', 'id')
            .addSelect('favorite.id_entry', 'id_entry')
            .addSelect('favorite.id_user', 'id_user')
            .addSelect('entry.word', 'word')
            .addSelect('favorite.created_at', 'created_at')
            .innerJoin(EntryOrm, 'entry', 'entry.id = favorite.id_entry')
            .where('favorite.id_user = :idUser', { idUser })
            .orderBy('favorite.id', 'DESC');

        const favorites = await query.getRawMany();
        return {
            favorites: favorites.map(favorite => ({
                id: favorite.id,
                idEntry: favorite.id_entry,
                word: favorite.word,
                createdAt: favorite.created_at,
            }))
        };
    }

    async addFavorite(params: AddFavoriteRepositoryInput): Promise<void> {
        const { idEntry, idUser } = params;
        await this.favoritesRepository.insert({ idEntry, idUser });
    }

    async removeFavorite(params: RemoveFavoriteRepositoryInput): Promise<void> {
        const { idEntry, idUser } = params;
        await this.favoritesRepository.delete({ idEntry, idUser });
    }

    async saveHistory(params: SaveHistoryRepositoryInput): Promise<void> {
        const { idEntry, idUser } = params;
        await this.historyRepository.insert({ idEntry, idUser });
    }

    async findHistory(params: FindHistoryRepositoryInput): Promise<FindHistoryRepositoryOutput> {
        const { idUser } = params;
        const query = this.historyRepository.createQueryBuilder('history')
            .select('history.id', 'id')
            .addSelect('history.id_entry', 'id_entry')
            .addSelect('history.id_user', 'id_user')
            .addSelect('entry.word', 'word')
            .addSelect('history.created_at', 'created_at')
            .innerJoin(EntryOrm, 'entry', 'entry.id = history.id_entry')
            .where('history.id_user = :idUser', { idUser })
            .orderBy('history.id', 'DESC');

        const history = await query.getRawMany();
        return {
            history: history.map(history => ({
                id: history.id,
                idEntry: history.id_entry,
                word: history.word,
                createdAt: history.created_at,
            }))
        };
    }

    async findByWord(params: FindByWordRepositoryInput): Promise<FindByWordRepositoryOutput> {
        const { word } = params;
        const result = await this.entriesRepository.findOne({
            select: {
                id: true,
                word: true,
                createdAt: true
            },
            where: { word: word.toLowerCase() }
        });
        return result ? {
            id: result.id,
            word: result.word,
            createdAt: result.createdAt
        } : null;
    }

    async findFavoriteById(params: FindFavoriteByIdRepositoryInput): Promise<FindFavoriteByIdRepositoryOutput> {
        const { idUser, idEntry } = params;
        const result = await this.favoritesRepository.findOne({
            select: {
                id: true,
                idEntry: true,
                createdAt: true
            },
            where: { idUser, idEntry }
        });
        return result ? {
            id: result.id,
            idEntry: result.idEntry,
            createdAt: result.createdAt
        } : null;
    }

    private getTotal({ search }: FindEntriesRepositoryInput): Promise<number> {
        const query = this.entriesRepository.createQueryBuilder('entry');
        search && query.where('entry.word LIKE :search', { search: `%${search.toLowerCase()}%` });
        return query.getCount();
    }

}
