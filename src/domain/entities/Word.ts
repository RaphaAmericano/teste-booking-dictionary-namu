export interface WordId {
    id?:string;
}

export interface Word extends WordId {
    word: string;
    number: number;
}