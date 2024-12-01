import { Word } from "../entities/Word";

export interface WordRepository {
    getAll(): Promise<Word[]>;
    getByTerm(query: string, page:number, page_size:number): Promise<Word[]> 
    getByWord(word: string): Promise<Word>;
}