import { FindEntriesRepositoryInput } from "../../domain/port/entries.repository.port";

export type FindEntriesInput = FindEntriesRepositoryInput

export type FindEntriesOutput = {
    results: string[]
    totalDocs: number
    previous: number
    next: number
    hasNext: boolean
    hasPrevious: boolean
}