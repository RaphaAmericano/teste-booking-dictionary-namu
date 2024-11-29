export interface WordId {
    id?:string;
}

export interface Word extends WordId {
    word: string;
    number: number;
}

export interface InserWordDto extends Omit<Word, "id"> {}