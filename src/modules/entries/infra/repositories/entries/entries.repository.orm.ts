import { EntriesRepositoryPort, FindEntriesRepositoryInput, FindEntriesRepositoryOutput } from 'src/modules/entries/domain/port/entries.repository.port';
import { EntryOrm } from 'src/modules/entries/infra/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesRepositoryOrm implements EntriesRepositoryPort {
    constructor(
        @InjectRepository(EntryOrm)
        private readonly entriesRepository: Repository<EntryOrm>,
    ) { }

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

    private getTotal({ search }: FindEntriesRepositoryInput): Promise<number> {
        const query = this.entriesRepository.createQueryBuilder('entry');
        search && query.where('entry.word LIKE :search', { search: `%${search.toLowerCase()}%` });
        return query.getCount();
    }

}
