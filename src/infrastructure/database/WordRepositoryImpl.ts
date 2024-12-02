import { Word } from "../../domain/entities/Word";
import { WordRepository } from "../../domain/interfaces/WordRepository";
interface WordRepositoryImplProps{
    getAllWordsFunction: () => Promise<Word[]>,
    getByTermFunction: (query:string, page_size:number, skip: number) => Promise<Word[]>,
    getWordFunction: (word:string) => Promise<Word>
    updateFunction: (id:string, data: Word) => Promise<Word>
}

export class WordRepositoryImpl implements WordRepository {
    private readonly getAllWordsFunction: () => Promise<Word[]>
    private readonly getByTermFunction: (query:string,  page_size:number, skip:number) => Promise<Word[]>
    private readonly getWordFunction: (word:string) => Promise<Word>
    private readonly updateFunction: (id:string, data: any) => Promise<any>

    constructor( props: WordRepositoryImplProps ) {
        this.getAllWordsFunction = props.getAllWordsFunction as () => Promise<Word[]>;
        this.getByTermFunction = props.getByTermFunction as (query:string, page_size:number, skip: number) => Promise<Word[]>;
        this.getWordFunction = props.getWordFunction as (word:string) => Promise<Word>;
        this.updateFunction = props.updateFunction as (id:string, data: Word) => Promise<Word>;
    }
    async getAll(): Promise<Word[]> {
        const result = await this.getAllWordsFunction();
        return result;
    }
    async getByTerm(word:string, page_size:number = 10, skip:number): Promise<Word[]> {
        const result = await this.getByTermFunction(word, page_size, skip);
        return result
    }
    async getByWord(word: string): Promise<Word> {
        const result = await this.getWordFunction(word);
        return result;
    }
    async update(id:string, data: any): Promise<Word> {
        const result = this.updateFunction(id, data);
        return result;
    }
}