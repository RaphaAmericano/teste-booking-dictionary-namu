import { Entry } from "../entities/Entry";

export interface EntryRepository {
    create(): Promise<Entry>
}