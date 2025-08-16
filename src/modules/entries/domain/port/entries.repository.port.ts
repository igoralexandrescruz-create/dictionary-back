export interface EntriesRepositoryPort {
    find(params: FindEntriesRepositoryInput): Promise<FindEntriesRepositoryOutput>;
    findByWord(params: FindByWordRepositoryInput): Promise<FindByWordRepositoryOutput | null>;
    findLastId(): Promise<number>;
    findFavorites(params: FindFavoritesRepositoryInput): Promise<FindFavoritesRepositoryOutput>;
    findFavoriteById(params: FindFavoriteByIdRepositoryInput): Promise<FindFavoriteByIdRepositoryOutput>;
    addFavorite(params: AddFavoriteRepositoryInput): Promise<void>;
    removeFavorite(params: RemoveFavoriteRepositoryInput): Promise<void>;
    saveHistory(params: SaveHistoryRepositoryInput): Promise<void>;
    findHistory(params: FindHistoryRepositoryInput): Promise<FindHistoryRepositoryOutput>;
    findLastHistory(idUser: number): Promise<Entry>;
}

export type FindByWordRepositoryInput = {
    word: string;
}

export type FindByWordRepositoryOutput = {
    id: number;
    word: string;
    createdAt: Date;
}

export type FindFavoriteByIdRepositoryInput = {
    idUser: number;
    idEntry: number;
}

export type FindFavoriteByIdRepositoryOutput = {
    id: number;
    idEntry: number;
    createdAt: Date;
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

export type FindFavoritesRepositoryInput = {
    idUser: number;
}

export type FindFavoritesRepositoryOutput = {
    favorites: Entry[]
}

export type AddFavoriteRepositoryInput = {
    idEntry: number;
    idUser: number;
}

export type RemoveFavoriteRepositoryInput = {
    idEntry: number;
    idUser: number;
}

export type SaveHistoryRepositoryInput = {
    idEntry: number;
    idUser: number;
}

export type FindHistoryRepositoryInput = {
    idUser: number;
}

export type FindHistoryRepositoryOutput = {
    history: Entry[]
}


export type Entry = {
    id: number;
    idEntry: number;
    word: string;
    createdAt: Date;
}