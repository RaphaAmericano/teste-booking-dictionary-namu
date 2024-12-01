export interface WordId {
  id?: string;
}

export interface Word extends WordId {
  word: string;
  number: number;
}

export interface Root {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  origin: string
  meanings: Meaning[]
}

export interface Phonetic {
  text: string
  audio?: string
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

export interface Definition {
  definition: string
  example: string
  synonyms: any[]
  antonyms: any[]
}


export interface InserWordDto extends Omit<Word, "id"> {}

export interface SearchWordDto extends Pick<Word, "word"> {}
