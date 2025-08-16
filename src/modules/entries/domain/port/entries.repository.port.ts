export interface EntriesRepositoryPort {
    find(params: FindEntriesRepositoryInput): Promise<FindEntriesRepositoryOutput>;
    findLastId(): Promise<number>;
}

export type FindEntriesRepositoryInput = {
    limit: number;
    lastId?: number;
    search?: string;
}

export type FindEntriesRepositoryOutput = {
    entries: {
        id: number;
        word: string;
        createdAt: Date;
    }[]
    total: number
}