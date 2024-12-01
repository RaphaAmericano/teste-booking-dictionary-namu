import { Word } from "../../domain/entities/Word";
import { WordRepository } from "../../domain/interfaces/WordRepository";
interface WordRepositoryImplProps{
    getAllWordsFunction: () => Promise<Word[]>,
    getByTermFunction: (query:string, page_size:number, skip: number) => Promise<Word[]>,
    getWord: (word:string) => Promise<Word>
}

export class WordRepositoryImpl implements WordRepository {
    private readonly getAllWords: () => Promise<Word[]>
    private readonly getByTermFunction: (query:string,  page_size:number, skip:number) => Promise<Word[]>
    private readonly getWord: (word:string) => Promise<Word>
    constructor( props: WordRepositoryImplProps ) {
        this.getAllWords = props.getAllWordsFunction as () => Promise<Word[]>;
        this.getByTermFunction = props.getByTermFunction as (query:string, page_size:number, skip: number) => Promise<Word[]>;
        this.getWord = props.getWord as (word:string) => Promise<Word>;
    }
    async getAll(): Promise<Word[]> {
        const result = await this.getAllWords();
        return result;
    }
    async getByTerm(word:string, page_size:number = 10, skip:number): Promise<Word[]> {
        const result = await this.getByTermFunction(word, page_size, skip);
        return result
    }
    async getByWord(word: string): Promise<Word> {
        const result = await this.getWord(word);
        return result;
    }

}