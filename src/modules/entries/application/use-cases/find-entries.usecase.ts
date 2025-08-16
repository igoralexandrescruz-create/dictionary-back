import { FindEntriesInput, FindEntriesOutput } from "src/modules/entries/application/dto/find-entries.dto";
import { ENTRIES_PORT_TOKENS } from "src/modules/entries/domain/port/tokens";
import { EntriesRepositoryPort } from "src/modules/entries/domain/port/entries.repository.port";
import { Usecase } from "src/modules/_shared/application/usecase.generic";
import { EntryOrm } from "src/modules/entries/infra/entities";
import { Inject } from "@nestjs/common";

export class FindEntriesUsecase extends Usecase<FindEntriesInput, FindEntriesOutput> {
    constructor(
        @Inject(ENTRIES_PORT_TOKENS.REPOSITORY)
        private readonly repository: EntriesRepositoryPort,
    ) {
        super('FindEntriesUsecase', 'V1');
    }

    async handleUsecase(params: FindEntriesInput): Promise<Usecase.Response<FindEntriesOutput>> {
        const { entries, total } = await this.repository.find(params);

        if (total === 0) {
            return {
                data: {
                    results: [],
                    totalDocs: 0,
                    previous: 0,
                    next: 0,
                    hasNext: false,
                    hasPrevious: false,
                },
                error: null,
            };
        }

        const [
            hasNext,
            hasPrevious,
            next,
            previous,
        ] = await Promise.all([
            this.hasNext(entries[entries.length - 1].id),
            this.hasPrevious(entries[0].id),
            this.getNext(entries),
            this.getPrevious(entries, params.limit),
        ]);

        return {
            data: {
                results: entries.map(entry => entry.word),
                totalDocs: total,
                previous,
                next,
                hasNext,
                hasPrevious,
            },
            error: null,
        };
    }


    private async hasNext(lastId: number): Promise<boolean> {
        const dbLastId = await this.repository.findLastId();
        return lastId < dbLastId;
    }

    private async hasPrevious(firstId: number): Promise<boolean> {
        return firstId > 1;
    }

    private async getNext(entries: EntryOrm[]): Promise<number> {
        return entries[entries.length - 1].id;
    }

    private async getPrevious(entries: EntryOrm[], limit: number): Promise<number> {
        const firstId = entries[0].id;
        const previous = (firstId - 1) - limit;
        return previous > 0 ? previous : 0;
    }
}